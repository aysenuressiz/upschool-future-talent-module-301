from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from app.storage import DAILY_LOGS, NOTIFICATION_HISTORY


def _local_day_key(*, timestamp_utc: datetime, timezone_name: str, day_start_hour: int) -> str:
  local_dt = timestamp_utc.astimezone(ZoneInfo(timezone_name))
  shifted = local_dt - timedelta(hours=day_start_hour)
  return shifted.date().isoformat()


def calculate_streak(
  *,
  user_id: str,
  timezone_name: str,
  day_start_hour: int = 4,
) -> int:
  logs = [log for log in DAILY_LOGS if log.user_id == user_id]
  if not logs:
    return 0
  unique_days = sorted(
    {_local_day_key(timestamp_utc=log.timestamp_utc, timezone_name=timezone_name, day_start_hour=day_start_hour) for log in logs},
    reverse=True,
  )
  streak = 1
  for idx in range(len(unique_days) - 1):
    current = datetime.fromisoformat(unique_days[idx])
    previous = datetime.fromisoformat(unique_days[idx + 1])
    if (current - previous).days == 1:
      streak += 1
      continue
    break
  return streak


def should_send_reminder(
  *,
  user_id: str,
  now_utc: datetime,
  timezone_name: str,
  day_start_hour: int = 4,
) -> bool:
  local_now = now_utc.astimezone(ZoneInfo(timezone_name))
  if local_now.hour < 21:
    return False
  day_key = _local_day_key(timestamp_utc=now_utc, timezone_name=timezone_name, day_start_hour=day_start_hour)
  has_today_log = any(
    _local_day_key(timestamp_utc=log.timestamp_utc, timezone_name=timezone_name, day_start_hour=day_start_hour) == day_key
    for log in DAILY_LOGS
    if log.user_id == user_id
  )
  if has_today_log:
    return False
  already_sent = any(
    _local_day_key(timestamp_utc=sent_at, timezone_name=timezone_name, day_start_hour=day_start_hour) == day_key
    for sent_at in NOTIFICATION_HISTORY[user_id]
  )
  return not already_sent


def record_reminder(*, user_id: str, sent_at_utc: datetime) -> None:
  NOTIFICATION_HISTORY[user_id].append(sent_at_utc)
