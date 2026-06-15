const API_BASE_URL = "https://yan1405-mdcrescitech.hf.space";

export interface ConvertResponse {
  filename: string;
  extension: string;
  markdown: string;
  char_count: number;
}

export async function convert(file: File): Promise<ConvertResponse> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/convert`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
    );
  }

  if (!response.ok) {
    let detail: string;
    try {
      const body = (await response.json()) as { detail?: unknown };
      detail =
        typeof body.detail === "string"
          ? body.detail
          : `Erro HTTP ${response.status}`;
    } catch {
      detail = `Erro HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(detail);
  }

  const data = (await response.json()) as Record<string, unknown>;
  if (
    typeof data.filename !== "string" ||
    typeof data.extension !== "string" ||
    typeof data.markdown !== "string" ||
    typeof data.char_count !== "number"
  ) {
    throw new Error("Resposta inesperada do servidor.");
  }
  return data as unknown as ConvertResponse;
}
