from datetime import datetime, timezone

from app.models import DailyLog
from app.services.streak_service import calculate_streak, should_send_reminder
from app.storage import DAILY_LOGS, NOTIFICATION_HISTORY


def test_grace_period_counts_previous_day() -> None:
  DAILY_LOGS.clear()
  NOTIFICATION_HISTORY.clear()
  DAILY_LOGS.append(
    DailyLog(
      id='1',
      user_id='u1',
      book_id='b1',
      pages_read=5,
      timestamp_utc=datetime(2026, 4, 21, 1, 0, tzinfo=timezone.utc),
      session_duration_seconds=300,
    )
  )
  DAILY_LOGS.append(
    DailyLog(
      id='2',
      user_id='u1',
      book_id='b1',
      pages_read=6,
      timestamp_utc=datetime(2026, 4, 20, 3, 0, tzinfo=timezone.utc),
      session_duration_seconds=300,
    )
  )
  streak = calculate_streak(user_id='u1', timezone_name='UTC', day_start_hour=4)
  assert streak == 2


def test_send_reminder_when_21_and_no_log() -> None:
  DAILY_LOGS.clear()
  should_send = should_send_reminder(
    user_id='u9',
    now_utc=datetime(2026, 4, 21, 21, 5, tzinfo=timezone.utc),
    timezone_name='UTC',
    day_start_hour=4,
  )
  assert should_send
