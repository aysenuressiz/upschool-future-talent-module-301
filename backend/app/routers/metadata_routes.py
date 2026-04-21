import asyncio

from fastapi import APIRouter

from app.schemas import MetadataLookupRequest
from app.services.metadata_pipeline import (
  fetch_google_books,
  fetch_local_publishers,
  fetch_open_library,
  is_valid_isbn13,
  merge_metadata,
  run_ocr_fallback,
)

router = APIRouter()


@router.post('/lookup')
async def lookup_metadata(payload: MetadataLookupRequest) -> dict:
  if not is_valid_isbn13(isbn_13=payload.isbn_13):
    return {'ok': False, 'error': 'Invalid ISBN-13 checksum.'}
  google, open_library, local = await asyncio.gather(
    fetch_google_books(isbn_13=payload.isbn_13),
    fetch_open_library(isbn_13=payload.isbn_13),
    fetch_local_publishers(isbn_13=payload.isbn_13),
  )
  merged = merge_metadata(isbn_13=payload.isbn_13, candidates=[google, open_library, local])
  if merged.get('needs_ocr'):
    merged.update(
      run_ocr_fallback(isbn_13=payload.isbn_13, fallback_cover_image_url=payload.fallback_cover_image_url)
    )
  return {'ok': True, 'metadata': merged}
