from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.routers import convert

MAX_UPLOAD_SIZE = 500 * 1024 * 1024  # 500 MB

app = FastAPI(title="mdcrescitech", version="1.0.0")


@app.middleware("http")
async def limit_upload_size(request: Request, call_next):
    if request.method in ("POST", "PUT", "PATCH"):
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > MAX_UPLOAD_SIZE:
            return JSONResponse(
                status_code=413,
                content={"detail": "File too large. Maximum upload size is 500 MB."},
            )
    return await call_next(request)


app.include_router(convert.router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "system": "mdcrescitech"}
