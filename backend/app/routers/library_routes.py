from fastapi import APIRouter

from app.schemas import AddBookRequest, AddDailyLogRequest, DuplicateResolutionRequest, LendBookRequest, MetadataLookupRequest
from app.services.library_service import add_book_to_library, create_daily_log, lend_book, resolve_duplicate, upsert_book
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


@router.post('/duplicates/resolve')
def resolve_book_duplicate(payload: DuplicateResolutionRequest) -> dict:
  item = resolve_duplicate(payload=payload)
  return {'ok': True, 'library_item': item.model_dump()}


@router.post('/logs')
def create_log(payload: AddDailyLogRequest) -> dict:
  return {'ok': True, **create_daily_log(payload=payload)}


@router.post('/lend')
def lend(payload: LendBookRequest) -> dict:
  result = lend_book(payload=payload)
  return {'ok': True, 'lending_log': result.model_dump()}


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
