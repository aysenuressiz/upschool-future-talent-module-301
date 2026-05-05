from fastapi import APIRouter, Query

from app.schemas import (
  AddBookRequest,
  AddDailyLogRequest,
  DuplicateResolutionRequest,
  LendBookRequest,
  MetadataLookupRequest,
  UpdateBookRequest,
  UpdateDailyLogRequest,
  UpdateLendingRequest,
  UpdateLibraryItemRequest,
)
from app.services.library_service import (
  add_book_to_library,
  create_daily_log,
  delete_book,
  delete_daily_log,
  delete_lending_log,
  delete_library_item,
  get_book,
  get_daily_log,
  get_lending_log,
  get_library_item,
  lend_book,
  list_books,
  list_daily_logs,
  list_lending_logs,
  list_library_items,
  resolve_duplicate,
  update_book,
  update_daily_log,
  update_lending_log,
  update_library_item,
  upsert_book,
)
from app.services.metadata_pipeline import (
  fetch_google_books,
  fetch_local_publishers,
  fetch_open_library,
  is_valid_isbn13,
  merge_metadata,
  metadata_to_book,
  run_ocr_fallback,
)

router = APIRouter()


@router.post('/books')
async def add_book(payload: AddBookRequest) -> dict:
  if not is_valid_isbn13(isbn_13=payload.isbn_13):
    return {'ok': False, 'error': 'Invalid ISBN-13 checksum.'}
  candidates = await _fetch_candidates(isbn_13=payload.isbn_13)
  merged = merge_metadata(isbn_13=payload.isbn_13, candidates=candidates)
  if merged.get('needs_ocr'):
    merged.update(run_ocr_fallback(isbn_13=payload.isbn_13, fallback_cover_image_url=None))
  book = upsert_book(book=metadata_to_book(metadata=merged))
  library_item = add_book_to_library(payload=payload, book=book)
  return {'ok': True, 'book': book.model_dump(), 'library_item': library_item.model_dump()}


@router.get('/books')
def get_books() -> dict:
  books = [book.model_dump() for book in list_books()]
  return {'ok': True, 'books': books}


@router.get('/books/{book_id}')
def get_book_by_id(book_id: str) -> dict:
  book = get_book(book_id=book_id)
  return {'ok': True, 'book': book.model_dump()}


@router.patch('/books/{book_id}')
def patch_book(book_id: str, payload: UpdateBookRequest) -> dict:
  book = update_book(book_id=book_id, payload=payload)
  return {'ok': True, 'book': book.model_dump()}


@router.delete('/books/{book_id}')
def remove_book(book_id: str) -> dict:
  delete_book(book_id=book_id)
  return {'ok': True}


@router.get('/users/{user_id}/books')
def get_user_books(user_id: str) -> dict:
  items = [item.model_dump() for item in list_library_items(user_id=user_id)]
  return {'ok': True, 'library_items': items}


@router.get('/users/{user_id}/books/{book_id}')
def get_user_book(user_id: str, book_id: str) -> dict:
  item = get_library_item(user_id=user_id, book_id=book_id)
  return {'ok': True, 'library_item': item.model_dump()}


@router.patch('/users/{user_id}/books/{book_id}')
def patch_user_book(user_id: str, book_id: str, payload: UpdateLibraryItemRequest) -> dict:
  item = update_library_item(user_id=user_id, book_id=book_id, payload=payload)
  return {'ok': True, 'library_item': item.model_dump()}


@router.delete('/users/{user_id}/books/{book_id}')
def remove_user_book(user_id: str, book_id: str) -> dict:
  delete_library_item(user_id=user_id, book_id=book_id)
  return {'ok': True}


@router.post('/duplicates/resolve')
def resolve_book_duplicate(payload: DuplicateResolutionRequest) -> dict:
  item = resolve_duplicate(payload=payload)
  return {'ok': True, 'library_item': item.model_dump()}


@router.post('/logs')
def create_log(payload: AddDailyLogRequest) -> dict:
  return {'ok': True, **create_daily_log(payload=payload)}


@router.get('/logs')
def get_logs(user_id: str | None = Query(default=None), book_id: str | None = Query(default=None)) -> dict:
  logs = [log.model_dump() for log in list_daily_logs(user_id=user_id, book_id=book_id)]
  return {'ok': True, 'logs': logs}


@router.get('/logs/{log_id}')
def get_log_by_id(log_id: str) -> dict:
  log = get_daily_log(log_id=log_id)
  return {'ok': True, 'log': log.model_dump()}


@router.patch('/logs/{log_id}')
def patch_log(log_id: str, payload: UpdateDailyLogRequest) -> dict:
  log = update_daily_log(log_id=log_id, payload=payload)
  return {'ok': True, 'log': log.model_dump()}


@router.delete('/logs/{log_id}')
def remove_log(log_id: str) -> dict:
  delete_daily_log(log_id=log_id)
  return {'ok': True}


@router.post('/lend')
def lend(payload: LendBookRequest) -> dict:
  result = lend_book(payload=payload)
  return {'ok': True, 'lending_log': result.model_dump()}


@router.get('/lendings')
def get_lendings(book_owner_id: str | None = Query(default=None)) -> dict:
  lending_logs = [log.model_dump() for log in list_lending_logs(book_owner_id=book_owner_id)]
  return {'ok': True, 'lending_logs': lending_logs}


@router.get('/lendings/{lending_id}')
def get_lending_by_id(lending_id: str) -> dict:
  lending_log = get_lending_log(lending_id=lending_id)
  return {'ok': True, 'lending_log': lending_log.model_dump()}


@router.patch('/lendings/{lending_id}')
def patch_lending(lending_id: str, payload: UpdateLendingRequest) -> dict:
  lending_log = update_lending_log(lending_id=lending_id, payload=payload)
  return {'ok': True, 'lending_log': lending_log.model_dump()}


@router.delete('/lendings/{lending_id}')
def remove_lending(lending_id: str) -> dict:
  delete_lending_log(lending_id=lending_id)
  return {'ok': True}


@router.post('/metadata/preview')
async def metadata_preview(payload: MetadataLookupRequest) -> dict:
  candidates = await _fetch_candidates(isbn_13=payload.isbn_13)
  merged = merge_metadata(isbn_13=payload.isbn_13, candidates=candidates)
  if merged.get('needs_ocr'):
    merged.update(
      run_ocr_fallback(isbn_13=payload.isbn_13, fallback_cover_image_url=payload.fallback_cover_image_url)
    )
  return {'ok': True, 'metadata': merged}


async def _fetch_candidates(*, isbn_13: str) -> list[dict]:
  google = await fetch_google_books(isbn_13=isbn_13)
  open_library = await fetch_open_library(isbn_13=isbn_13)
  local = await fetch_local_publishers(isbn_13=isbn_13)
  return [google, open_library, local]
