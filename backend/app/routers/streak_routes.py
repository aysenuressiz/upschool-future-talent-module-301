from datetime import datetime, timezone

from fastapi import APIRouter

from app.schemas import DayBoundarySettingsRequest
from app.services.streak_service import calculate_streak, record_reminder, should_send_reminder

router = APIRouter()


@router.post('/calculate')
def calculate(payload: DayBoundarySettingsRequest) -> dict:
  streak = calculate_streak(
    user_id=payload.user_id,
    timezone_name=payload.timezone,
    day_start_hour=payload.day_start_hour,
  )
  return {'ok': True, 'streak': streak}


@router.post('/reminder/check')
def check_reminder(payload: DayBoundarySettingsRequest) -> dict:
  now_utc = datetime.now(tz=timezone.utc)
  should_send = should_send_reminder(
    user_id=payload.user_id,
    now_utc=now_utc,
    timezone_name=payload.timezone,
    day_start_hour=payload.day_start_hour,
  )
  if should_send:
    record_reminder(user_id=payload.user_id, sent_at_utc=now_utc)
  return {'ok': True, 'should_send': should_send}
