import pymupdf4llm


def convert_to_markdown(file_path: str) -> str:
    try:
        chunks = pymupdf4llm.to_markdown(file_path, page_chunks=True)
        return "\n\n".join(chunk["text"] for chunk in chunks)
    except Exception as exc:
        raise RuntimeError(f"PDF conversion failed: {exc}") from exc
