from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

LibraryStatus = Literal['reading', 'finished', 'wishlist']


class User(BaseModel):
  id: str
  email: EmailStr
  streak_count: int = 0
  last_login: datetime | None = None
  xp_total: int = 0
  level_id: int = 1
  timezone: str = 'UTC'
  day_start_hour: int = Field(default=4, ge=0, le=23)


class Book(BaseModel):
  id: str
  isbn_13: str
  title: str
  author_id: str | None = None
  genre: str | None = None
  page_count: int = Field(default=1, ge=1)
  spine_color_hex: str | None = None
  average_rating: float | None = None
  cover_url_high_res: str | None = None


class UserLibraryItem(BaseModel):
  user_id: str
  book_id: str
  status: LibraryStatus
  current_page: int = 0
  shelf_position_index: int = 0
  physical_shelf_no: int = 1
  date_added: datetime
  copy_count: int = 1


class DailyLog(BaseModel):
  id: str
  user_id: str
  book_id: str
  pages_read: int = Field(ge=0)
  timestamp_utc: datetime
  session_duration_seconds: int = Field(ge=0)


class LendingLog(BaseModel):
  id: str
  book_owner_id: str
  borrower_name: str
  contact_info: str | None = None
  lend_date: datetime
  expected_return_date: datetime | None = None
  return_status: Literal['lent', 'returned', 'overdue'] = 'lent'


class Following(BaseModel):
  follower_id: str
  following_id: str
  created_at: datetime
