from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

LibraryStatus = Literal['reading', 'finished', 'wishlist']


class AddBookRequest(BaseModel):
  user_id: str
  isbn_13: str
  status: LibraryStatus = 'wishlist'
  current_page: int = 0


class DuplicateResolutionRequest(BaseModel):
  user_id: str
  book_id: str
  action: Literal['increment_copy', 'restart_reading']


class AddDailyLogRequest(BaseModel):
  user_id: str
  book_id: str
  pages_read: int = Field(ge=0)
  session_duration_seconds: int = Field(ge=0)
  timestamp_utc: datetime | None = None


class LendBookRequest(BaseModel):
  book_owner_id: str
  borrower_name: str
  contact_info: str | None = None
  expected_return_date: datetime | None = None


class MetadataLookupRequest(BaseModel):
  isbn_13: str
  fallback_cover_image_url: str | None = None


class DayBoundarySettingsRequest(BaseModel):
  user_id: str
  timezone: str
  day_start_hour: int = Field(default=4, ge=0, le=23)
