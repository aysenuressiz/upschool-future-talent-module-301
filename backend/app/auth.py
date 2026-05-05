import secrets
from datetime import timedelta

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.storage import ACCESS_TOKENS, utc_now

TOKEN_TTL_MINUTES = 60
bearer_scheme = HTTPBearer(auto_error=False)


def issue_access_token(*, user_id: str) -> str:
  now_utc = utc_now()
  token = secrets.token_urlsafe(32)
  ACCESS_TOKENS[token] = {'user_id': user_id, 'expires_at': now_utc + timedelta(minutes=TOKEN_TTL_MINUTES)}
  return token


def require_access_token(
  credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict[str, str]:
  if credentials is None:
    raise HTTPException(status_code=401, detail='Access token is required.')
  if credentials.scheme.lower() != 'bearer':
    raise HTTPException(status_code=401, detail='Invalid authentication scheme.')
  token = credentials.credentials
  token_record = ACCESS_TOKENS.get(token)
  if token_record is None:
    raise HTTPException(status_code=401, detail='Invalid access token.')
  if token_record['expires_at'] <= utc_now():
    ACCESS_TOKENS.pop(token, None)
    raise HTTPException(status_code=401, detail='Access token expired.')
  return {'user_id': token_record['user_id']}
