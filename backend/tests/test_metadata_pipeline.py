import asyncio

from app.services.metadata_pipeline import (
  fetch_google_books,
  fetch_local_publishers,
  fetch_open_library,
  is_valid_isbn13,
  merge_metadata,
  run_ocr_fallback,
)


def test_isbn13_validator() -> None:
  assert is_valid_isbn13(isbn_13='9780306406157')
  assert not is_valid_isbn13(isbn_13='9780306406158')


def test_parallel_fetch_and_merge() -> None:
  async def _run() -> tuple[dict, dict, dict]:
    return await asyncio.gather(
      fetch_google_books(isbn_13='9780306406157'),
      fetch_open_library(isbn_13='9780306406157'),
      fetch_local_publishers(isbn_13='9780306406157'),
    )

  google, open_library, local = asyncio.run(_run())
  merged = merge_metadata(isbn_13='9780306406157', candidates=[google, open_library, local])
  assert merged['title']
  assert merged['page_count'] >= 1
  assert not merged['needs_ocr']


def test_ocr_fallback_confidence_window() -> None:
  fallback = run_ocr_fallback(isbn_13='9780306406157', fallback_cover_image_url=None)
  assert 0.75 <= fallback['ocr_confidence'] <= 0.99
