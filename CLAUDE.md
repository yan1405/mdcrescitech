# CLAUDE.md — mdcrescitech

## Visão Geral do Projeto

Sistema de conversão de arquivos para Markdown.
Recebe arquivos em múltiplos formatos via endpoint HTTP e retorna o conteúdo convertido
em Markdown estruturado, pronto para uso em pipelines de IA generativa.

---

## Arquitetura

Dois motores de conversão com responsabilidades distintas:

- **PyMuPDF4LLM** — exclusivo para arquivos PDF. Processa por chunks de página
  (page_chunks=True). Obrigatório para documentos grandes.
- **MarkItDown** — todos os demais formatos: DOCX, PPTX, XLSX, HTML, CSV, JSON, XML.

O roteamento é automático por extensão de arquivo. O usuário não precisa especificar o motor.

---

## Stack

- Python 3.10+
- FastAPI
- Uvicorn
- python-multipart
- pymupdf4llm
- markitdown[all]

---

## Estrutura de Pastas

```
mdcrescitech/
├── .claude/
│   ├── commands/
│   └── skills/
│       ├── verification-quality/
│       ├── agent-code-analyzer/
│       ├── pair-programming/
│       └── github-workflow-automation/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── routers/
│   │   ├── __init__.py
│   │   └── convert.py
│   └── services/
│       ├── __init__.py
│       ├── pdf_converter.py
│       └── general_converter.py
├── tests/
├── CLAUDE.md
├── requirements.txt
├── .env.example
└── .gitignore
```

---

## Comandos Essenciais

```bash
# Criar e ativar ambiente virtual
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Instalar dependências
pip install -r requirements.txt

# Rodar o servidor localmente
uvicorn app.main:app --reload --port 8000

# Rodar testes
pytest tests/
```

---

## Convenções de Código

- Todo o código deve ser escrito em inglês.
- Cada arquivo tem responsabilidade única. Não misturar lógica de roteamento com lógica de conversão.
- Todo endpoint deve validar a extensão do arquivo antes de processar.
- Arquivos PDF escaneados estão fora do escopo. O sistema opera apenas sobre PDFs com OCR já embutido.
- Limite máximo de upload: 500 MB por requisição.

---

## Regras para o Agente

- Nunca pular etapas de validação de arquivo.
- Nunca instalar dependências fora do requirements.txt sem avisar.
- Sempre rodar os testes após qualquer alteração nos serviços de conversão.
- Em caso de dúvida sobre o comportamento esperado, perguntar antes de implementar.

---

## Skills Ativas

- verification-quality
- agent-code-analyzer
- pair-programming
- github-workflow-automation

---

## Contexto

Projeto da Crescitech — consultoria especializada em IA Generativa.
Desenvolvido por Yan Guilherme.
Uso interno. Não é um produto comercial.
Repositório: https://github.com/yan1405/mdcrescitech
