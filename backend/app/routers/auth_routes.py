from fastapi import APIRouter

from app.auth import issue_access_token
from app.schemas import AccessTokenRequest, AccessTokenResponse

router = APIRouter()


@router.post('/token', response_model=AccessTokenResponse)
def create_access_token(payload: AccessTokenRequest) -> AccessTokenResponse:
  access_token = issue_access_token(user_id=payload.user_id)
  return AccessTokenResponse(access_token=access_token)
