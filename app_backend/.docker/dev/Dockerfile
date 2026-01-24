# 1. Use a slim Python 2026-standard image
FROM python:3.12-slim

# 2. Install PostgreSQL client 18
# 2.1. Set environment variables to non-interactive for apt
ENV DEBIAN_FRONTEND=noninteractive

# 2.2. Install dependencies, add PostgreSQL GPG key, and add the repository
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    && curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg \
    && echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends postgresql-client-18 \
    # Cleanup to reduce image size
    && apt-get purge -y --auto-remove curl gnupg2 lsb-release \
    && rm -rf /var/lib/apt/lists/*

# 2.3. Copy custom psql configuration
# COPY .psqlrc /root/.psqlrc

# 3. Install uv by copying from the official binary image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 4. Set environment variables
# - Avoid writing .pyc files
# - Force unbuffered output for real-time Docker logs
# - Install dependencies into a dedicated .venv
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

# 5. Create and use a non-root user for security and file sync permissions
RUN useradd -ms /bin/sh appuser
USER appuser
WORKDIR /app

# 6. Copy dependency files first to leverage Docker layer caching
# This makes 'rebuild' actions in Compose Watch significantly faster
COPY --chown=appuser:appuser pyproject.toml uv.lock ./

# 7. Install dependencies
# Using --frozen ensures the environment matches uv.lock exactly
RUN uv sync --frozen --no-cache --no-dev

# 8. Copy the rest of the application code
# Compose Watch will target this directory for 'sync' actions
COPY --chown=appuser:appuser . .

# 9. Ensure the virtual environment is used automatically
ENV PATH="/app/.venv/bin:$PATH"

# 10. Expose the port FastAPI runs on
EXPOSE 8000

# 11. Default command for production
# This is overridden by 'command' in docker-compose.yml for development
CMD ["fastapi", "run", "src/main.py", "--host", "0.0.0.0", "--port", "8000"]
