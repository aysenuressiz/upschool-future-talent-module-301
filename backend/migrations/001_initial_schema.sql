CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  streak_count INTEGER NOT NULL DEFAULT 0,
  last_login TIMESTAMPTZ,
  xp_total INTEGER NOT NULL DEFAULT 0,
  level_id INTEGER NOT NULL DEFAULT 1,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  day_start_hour INTEGER NOT NULL DEFAULT 4
);

CREATE TABLE books (
  id TEXT PRIMARY KEY,
  isbn_13 TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author_id TEXT,
  genre TEXT,
  page_count INTEGER NOT NULL,
  spine_color_hex TEXT,
  average_rating REAL,
  cover_url_high_res TEXT
);

CREATE TABLE user_library (
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_page INTEGER NOT NULL DEFAULT 0,
  shelf_position_index INTEGER NOT NULL DEFAULT 0,
  physical_shelf_no INTEGER NOT NULL DEFAULT 1,
  date_added TIMESTAMPTZ NOT NULL,
  copy_count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, book_id)
);

CREATE TABLE daily_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  pages_read INTEGER NOT NULL,
  timestamp_utc TIMESTAMPTZ NOT NULL,
  session_duration_seconds INTEGER NOT NULL
);

CREATE TABLE lending_log (
  id TEXT PRIMARY KEY,
  book_owner_id TEXT NOT NULL,
  borrower_name TEXT NOT NULL,
  contact_info TEXT,
  lend_date TIMESTAMPTZ NOT NULL,
  expected_return_date TIMESTAMPTZ,
  return_status TEXT NOT NULL DEFAULT 'lent'
);

CREATE TABLE following (
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);
