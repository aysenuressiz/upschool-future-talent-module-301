from uuid import uuid4

from fastapi import HTTPException

from app.models import Book, DailyLog, LendingLog, UserLibraryItem
from app.schemas import AddBookRequest, AddDailyLogRequest, DuplicateResolutionRequest, LendBookRequest
from app.storage import BOOKS, DAILY_LOGS, LENDING_LOGS, USER_LIBRARY, utc_now


def upsert_book(*, book: Book) -> Book:
  BOOKS[book.id] = book
  return book


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
