from datetime import datetime

from app.services.streak_service import should_send_reminder


def build_smart_reminder_message(*, first_name: str | None = None) -> str:
  prefix = f'{first_name}, ' if first_name else ''
  return f'{prefix}kitabin tozlaniyor... Sadece 2 sayfa okuyup serini korumaya ne dersin?'


def evaluate_and_prepare_reminder(
  *,
  user_id: str,
  now_utc: datetime,
  timezone_name: str,
  day_start_hour: int = 4,
  first_name: str | None = None,
) -> dict[str, str | bool]:
  can_send = should_send_reminder(
    user_id=user_id,
    now_utc=now_utc,
    timezone_name=timezone_name,
    day_start_hour=day_start_hour,
  )
  return {
    'should_send': can_send,
    'message': build_smart_reminder_message(first_name=first_name),
  }
