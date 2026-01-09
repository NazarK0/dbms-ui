# 1. Use a slim Python 2026-standard image
FROM python:3.12-slim

# 2. Install uv by copying from the official binary image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 3. Set environment variables
# - Avoid writing .pyc files
# - Force unbuffered output for real-time Docker logs
# - Install dependencies into a dedicated .venv
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

# 4. Create and use a non-root user for security and file sync permissions
RUN useradd -ms /bin/sh appuser
USER appuser
WORKDIR /app

# 5. Copy dependency files first to leverage Docker layer caching
# This makes 'rebuild' actions in Compose Watch significantly faster
COPY --chown=appuser:appuser pyproject.toml uv.lock ./

# 6. Install dependencies
# Using --frozen ensures the environment matches uv.lock exactly
RUN uv sync --frozen --no-cache --no-dev

# 7. Copy the rest of the application code
# Compose Watch will target this directory for 'sync' actions
COPY --chown=appuser:appuser . .

# 8. Ensure the virtual environment is used automatically
ENV PATH="/app/.venv/bin:$PATH"

# 9. Expose the port FastAPI runs on
EXPOSE 8000

# 10. Default command for production
# This is overridden by 'command' in docker-compose.yml for development
CMD ["fastapi", "run", "src/main.py", "--host", "0.0.0.0", "--port", "8000"]
