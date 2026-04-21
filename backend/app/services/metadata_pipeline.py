import hashlib
from typing import Any

from app.models import Book


def is_valid_isbn13(*, isbn_13: str) -> bool:
  if len(isbn_13) != 13 or not isbn_13.isdigit():
    return False
  checksum_base = isbn_13[:-1]
  checksum = int(isbn_13[-1])
  weighted_sum = sum(int(digit) * (1 if idx % 2 == 0 else 3) for idx, digit in enumerate(checksum_base))
  expected = (10 - (weighted_sum % 10)) % 10
  return checksum == expected


async def fetch_google_books(*, isbn_13: str) -> dict[str, Any]:
  return {'source': 'google', 'title': f'Book {isbn_13[-4:]}', 'page_count': 220, 'cover_resolution': 1200}


async def fetch_open_library(*, isbn_13: str) -> dict[str, Any]:
  return {'source': 'openlibrary', 'title': f'Open {isbn_13[-3:]}', 'genre': 'General', 'cover_resolution': 800}


async def fetch_local_publishers(*, isbn_13: str) -> dict[str, Any]:
  return {'source': 'local', 'author_id': f'author-{isbn_13[-5:]}', 'cover_resolution': 1000}


def merge_metadata(*, isbn_13: str, candidates: list[dict[str, Any]]) -> dict[str, Any]:
  sorted_by_cover = sorted(candidates, key=lambda item: item.get('cover_resolution', 0), reverse=True)
  merged: dict[str, Any] = {'isbn_13': isbn_13, 'title': None, 'page_count': 1}
  for item in sorted_by_cover:
    for key, value in item.items():
      if value is None:
        continue
      if merged.get(key) in (None, '', 0, 1):
        merged[key] = value
  if merged.get('title') is None:
    return {'isbn_13': isbn_13, 'needs_ocr': True}
  merged['needs_ocr'] = False
  return merged


def run_ocr_fallback(*, isbn_13: str, fallback_cover_image_url: str | None) -> dict[str, Any]:
  confidence_raw = int(hashlib.sha256(isbn_13.encode('utf-8')).hexdigest()[:2], 16)
  confidence = round(0.75 + (confidence_raw / 255) * 0.24, 2)
  return {
    'title': f'OCR detected title {isbn_13[-4:]}',
    'author_id': f'ocr-author-{isbn_13[-4:]}',
    'ocr_confidence': confidence,
    'cover_url_high_res': fallback_cover_image_url,
  }


def metadata_to_book(*, metadata: dict[str, Any]) -> Book:
  return Book(
    id=f"book-{metadata['isbn_13']}",
    isbn_13=metadata['isbn_13'],
    title=metadata.get('title', 'Unknown'),
    author_id=metadata.get('author_id'),
    genre=metadata.get('genre'),
    page_count=int(metadata.get('page_count', 1)),
    spine_color_hex=metadata.get('spine_color_hex', '#2A9D8F'),
    average_rating=metadata.get('average_rating'),
    cover_url_high_res=metadata.get('cover_url_high_res'),
  )
