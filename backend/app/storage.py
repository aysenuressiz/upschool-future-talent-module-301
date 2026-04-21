from collections import defaultdict
from datetime import datetime, timezone

from app.models import Book, DailyLog, LendingLog, User, UserLibraryItem

USERS: dict[str, User] = {}
BOOKS: dict[str, Book] = {}
USER_LIBRARY: dict[tuple[str, str], UserLibraryItem] = {}
DAILY_LOGS: list[DailyLog] = []
LENDING_LOGS: dict[str, LendingLog] = {}
FOLLOWING: set[tuple[str, str]] = set()
NOTIFICATION_HISTORY: defaultdict[str, list[datetime]] = defaultdict(list)


def utc_now() -> datetime:
  return datetime.now(tz=timezone.utc)
