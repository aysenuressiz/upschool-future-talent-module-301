from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

LibraryStatus = Literal['reading', 'finished', 'wishlist']


class AddBookRequest(BaseModel):
  user_id: str
  isbn_13: str
  status: LibraryStatus = 'wishlist'
  current_page: int = 0


class UpdateBookRequest(BaseModel):
  title: str | None = None
  author_id: str | None = None
  genre: str | None = None
  page_count: int | None = Field(default=None, ge=1)
  spine_color_hex: str | None = None
  average_rating: float | None = None
  cover_url_high_res: str | None = None


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


class UpdateDailyLogRequest(BaseModel):
  pages_read: int | None = Field(default=None, ge=0)
  session_duration_seconds: int | None = Field(default=None, ge=0)
  timestamp_utc: datetime | None = None


class LendBookRequest(BaseModel):
  book_owner_id: str
  borrower_name: str
  contact_info: str | None = None
  expected_return_date: datetime | None = None


class UpdateLendingRequest(BaseModel):
  borrower_name: str | None = None
  contact_info: str | None = None
  expected_return_date: datetime | None = None
  return_status: Literal['lent', 'returned', 'overdue'] | None = None


class UpdateLibraryItemRequest(BaseModel):
  status: LibraryStatus | None = None
  current_page: int | None = Field(default=None, ge=0)
  shelf_position_index: int | None = Field(default=None, ge=0)
  physical_shelf_no: int | None = Field(default=None, ge=1)


class MetadataLookupRequest(BaseModel):
  isbn_13: str
  fallback_cover_image_url: str | None = None


class DayBoundarySettingsRequest(BaseModel):
  user_id: str
  timezone: str
  day_start_hour: int = Field(default=4, ge=0, le=23)


class AccessTokenRequest(BaseModel):
  user_id: str


class AccessTokenResponse(BaseModel):
  access_token: str
  token_type: str = 'bearer'
