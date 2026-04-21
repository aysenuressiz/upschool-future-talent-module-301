from fastapi import FastAPI

from app.routers.library_routes import router as library_router
from app.routers.metadata_routes import router as metadata_router
from app.routers.streak_routes import router as streak_router
from app.routers.sync_routes import router as sync_router


def create_app() -> FastAPI:
  app = FastAPI(title='UNISHELF API', version='0.1.0')
  app.include_router(library_router, prefix='/api/v1/library', tags=['library'])
  app.include_router(metadata_router, prefix='/api/v1/metadata', tags=['metadata'])
  app.include_router(streak_router, prefix='/api/v1/streak', tags=['streak'])
  app.include_router(sync_router, prefix='/api/v1/sync', tags=['sync'])
  return app


app = create_app()
