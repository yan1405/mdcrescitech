from markitdown import MarkItDown


def convert_to_markdown(file_path: str) -> str:
    try:
        md = MarkItDown()
        result = md.convert(file_path)
        return result.text_content
    except Exception as exc:
        raise RuntimeError(f"File conversion failed: {exc}") from exc
