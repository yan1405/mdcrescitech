import os
import tempfile
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.general_converter import convert_to_markdown as general_convert
from app.services.pdf_converter import convert_to_markdown as pdf_convert

router = APIRouter()

SUPPORTED_EXTENSIONS = {"pdf", "docx", "pptx", "xlsx", "html", "csv", "json", "xml"}


@router.post("/convert")
async def convert_file(file: UploadFile = File(...)):
    filename = file.filename or ""
    extension = Path(filename).suffix.lstrip(".").lower()

    if not extension:
        raise HTTPException(
            status_code=415,
            detail=(
                f"Could not determine file type from '{filename}'. "
                f"Supported types: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
            ),
        )

    if extension not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=415,
            detail=(
                f"Unsupported file type '.{extension}'. "
                f"Supported types: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
            ),
        )

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{extension}") as tmp:
            tmp_path = tmp.name
            tmp.write(await file.read())

        if extension == "pdf":
            markdown = pdf_convert(tmp_path)
        else:
            markdown = general_convert(tmp_path)

        return {
            "filename": filename,
            "extension": extension,
            "markdown": markdown,
            "char_count": len(markdown),
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)
