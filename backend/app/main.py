from fastapi import Depends, FastAPI

from app.auth import require_access_token
from app.routers.auth_routes import router as auth_router
from app.routers.library_routes import router as library_router
from app.routers.metadata_routes import router as metadata_router
from app.routers.streak_routes import router as streak_router
from app.routers.sync_routes import router as sync_router


def create_app() -> FastAPI:
  app = FastAPI(title='UNISHELF API', version='0.1.0')
  protected_route_dependencies = [Depends(require_access_token)]
  app.include_router(auth_router, prefix='/api/v1/auth', tags=['auth'])
  app.include_router(
    library_router,
    prefix='/api/v1/library',
    tags=['library'],
    dependencies=protected_route_dependencies,
  )
  app.include_router(
    metadata_router,
    prefix='/api/v1/metadata',
    tags=['metadata'],
    dependencies=protected_route_dependencies,
  )
  app.include_router(
    streak_router,
    prefix='/api/v1/streak',
    tags=['streak'],
    dependencies=protected_route_dependencies,
  )
  app.include_router(
    sync_router,
    prefix='/api/v1/sync',
    tags=['sync'],
    dependencies=protected_route_dependencies,
  )
  return app


app = create_app()
