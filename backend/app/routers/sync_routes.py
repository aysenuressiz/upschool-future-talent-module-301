from fastapi import APIRouter

router = APIRouter()


@router.get('/status')
def sync_status() -> dict:
  return {
    'ok': True,
    'target_latency_ms': 500,
    'transport': 'websocket',
    'offline_mode': 'enabled',
  }
