from uuid import uuid4

from fastapi import HTTPException

from app.models import Book, DailyLog, LendingLog, UserLibraryItem
from app.schemas import (
  AddBookRequest,
  AddDailyLogRequest,
  DuplicateResolutionRequest,
  LendBookRequest,
  UpdateBookRequest,
  UpdateDailyLogRequest,
  UpdateLendingRequest,
  UpdateLibraryItemRequest,
)
from app.storage import BOOKS, DAILY_LOGS, LENDING_LOGS, USER_LIBRARY, utc_now


def upsert_book(*, book: Book) -> Book:
  BOOKS[book.id] = book
  return book


def list_books() -> list[Book]:
  return list(BOOKS.values())


def get_book(*, book_id: str) -> Book:
  book = BOOKS.get(book_id)
  if book is None:
    raise HTTPException(status_code=404, detail='Book not found.')
  return book


def update_book(*, book_id: str, payload: UpdateBookRequest) -> Book:
  book = get_book(book_id=book_id)
  update_data = payload.model_dump(exclude_none=True)
  if not update_data:
    return book
  updated_book = book.model_copy(update=update_data)
  BOOKS[book_id] = updated_book
  return updated_book


def delete_book(*, book_id: str) -> None:
  get_book(book_id=book_id)
  BOOKS.pop(book_id, None)
  for library_key in [key for key in USER_LIBRARY if key[1] == book_id]:
    USER_LIBRARY.pop(library_key, None)


def add_book_to_library(*, payload: AddBookRequest, book: Book) -> UserLibraryItem:
  duplicate_key = (payload.user_id, book.id)
  if duplicate_key in USER_LIBRARY:
    raise HTTPException(
      status_code=409,
      detail='Book already exists in library. Use duplicate resolution endpoint.',
    )
  item = UserLibraryItem(
    user_id=payload.user_id,
    book_id=book.id,
    status=payload.status,
    current_page=payload.current_page,
    date_added=utc_now(),
  )
  USER_LIBRARY[duplicate_key] = item
  return item


def list_library_items(*, user_id: str) -> list[UserLibraryItem]:
  return [item for (owner_id, _), item in USER_LIBRARY.items() if owner_id == user_id]


def get_library_item(*, user_id: str, book_id: str) -> UserLibraryItem:
  library_item = USER_LIBRARY.get((user_id, book_id))
  if library_item is None:
    raise HTTPException(status_code=404, detail='Library item not found.')
  return library_item


def update_library_item(*, user_id: str, book_id: str, payload: UpdateLibraryItemRequest) -> UserLibraryItem:
  library_item = get_library_item(user_id=user_id, book_id=book_id)
  update_data = payload.model_dump(exclude_none=True)
  if not update_data:
    return library_item
  updated_item = library_item.model_copy(update=update_data)
  USER_LIBRARY[(user_id, book_id)] = updated_item
  return updated_item


def delete_library_item(*, user_id: str, book_id: str) -> None:
  get_library_item(user_id=user_id, book_id=book_id)
  USER_LIBRARY.pop((user_id, book_id), None)


def resolve_duplicate(*, payload: DuplicateResolutionRequest) -> UserLibraryItem:
  key = (payload.user_id, payload.book_id)
  library_item = USER_LIBRARY.get(key)
  if library_item is None:
    raise HTTPException(status_code=404, detail='Library item not found.')
  if payload.action == 'increment_copy':
    library_item.copy_count += 1
    return library_item
  library_item.current_page = 0
  library_item.status = 'reading'
  return library_item


def create_daily_log(*, payload: AddDailyLogRequest) -> dict[str, str]:
  log_data = payload.model_dump()
  log = DailyLog(
    id=str(uuid4()),
    user_id=log_data['user_id'],
    book_id=log_data['book_id'],
    pages_read=log_data['pages_read'],
    session_duration_seconds=log_data['session_duration_seconds'],
    timestamp_utc=log_data['timestamp_utc'] or utc_now(),
  )
  DAILY_LOGS.append(log)
  return {'id': log.id}


def list_daily_logs(*, user_id: str | None = None, book_id: str | None = None) -> list[DailyLog]:
  logs = DAILY_LOGS
  if user_id is not None:
    logs = [log for log in logs if log.user_id == user_id]
  if book_id is not None:
    logs = [log for log in logs if log.book_id == book_id]
  return logs


def get_daily_log(*, log_id: str) -> DailyLog:
  for log in DAILY_LOGS:
    if log.id == log_id:
      return log
  raise HTTPException(status_code=404, detail='Daily log not found.')


def update_daily_log(*, log_id: str, payload: UpdateDailyLogRequest) -> DailyLog:
  existing_log = get_daily_log(log_id=log_id)
  update_data = payload.model_dump(exclude_none=True)
  if not update_data:
    return existing_log
  updated_log = existing_log.model_copy(update=update_data)
  for index, log in enumerate(DAILY_LOGS):
    if log.id == log_id:
      DAILY_LOGS[index] = updated_log
      return updated_log
  raise HTTPException(status_code=404, detail='Daily log not found.')


def delete_daily_log(*, log_id: str) -> None:
  existing_log = get_daily_log(log_id=log_id)
  DAILY_LOGS.remove(existing_log)


def lend_book(*, payload: LendBookRequest) -> LendingLog:
  lending = LendingLog(
    id=str(uuid4()),
    book_owner_id=payload.book_owner_id,
    borrower_name=payload.borrower_name,
    contact_info=payload.contact_info,
    lend_date=utc_now(),
    expected_return_date=payload.expected_return_date,
  )
  LENDING_LOGS[lending.id] = lending
  return lending


def list_lending_logs(*, book_owner_id: str | None = None) -> list[LendingLog]:
  lending_logs = list(LENDING_LOGS.values())
  if book_owner_id is None:
    return lending_logs
  return [log for log in lending_logs if log.book_owner_id == book_owner_id]


def get_lending_log(*, lending_id: str) -> LendingLog:
  lending = LENDING_LOGS.get(lending_id)
  if lending is None:
    raise HTTPException(status_code=404, detail='Lending log not found.')
  return lending


def update_lending_log(*, lending_id: str, payload: UpdateLendingRequest) -> LendingLog:
  lending = get_lending_log(lending_id=lending_id)
  update_data = payload.model_dump(exclude_none=True)
  if not update_data:
    return lending
  updated_lending = lending.model_copy(update=update_data)
  LENDING_LOGS[lending_id] = updated_lending
  return updated_lending


def delete_lending_log(*, lending_id: str) -> None:
  get_lending_log(lending_id=lending_id)
  LENDING_LOGS.pop(lending_id, None)
