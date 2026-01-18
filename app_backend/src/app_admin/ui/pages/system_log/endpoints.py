from typing import List
from app_admin.ui.pages.system_log.widgets.table.schema import SystemLogTableWidgetItem

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



system_log_page_routerV1 = APIRouter()

@system_log_page_routerV1.get("/table", response_model=List[SystemLogTableWidgetItem])
def get_recent_activity(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {
            "id": 1,
            "time": '2024-11-30 14:32:15',
            "level": 'error',
            "source": 'PostgreSQL',
            "database": 'production_db',
            "user": 'app_user',
            "message": 'помилка підключення: занадто багато клієнтів',
            "details": 'FATAL: sorry, too many clients already',
        },
        {
            "id": 2,
            "time": '2024-11-30 14:31:42',
            "level": 'warning',
            "source": 'Backup',
            "database": 'analytics_db',
            "user": 'system',
            "message": 'резервне копіювання зайняло більше часу, ніж очікувалося',
            "details": 'Backup duration: 45m 23s (expected: < 30m)',
        },
        {
            "id": 3,
            "time": '2024-11-30 14:30:18',
            "level": 'info',
            "source": 'Replication',
            "database": 'production_db',
            "user": 'replicator',
            "message": 'репліка успішно синхронізована',
            "details": 'Replica lag: 12ms',
        },
        {
            "id": 4,
            "time": '2024-11-30 14:28:55',
            "level": 'error',
            "source": 'Query',
            "database": 'production_db',
            "user": 'developer',
            "message": 'синтаксична помилка в SQL запиті',
            "details": 'ERROR: syntax error at or near "FORM" at line 1',
        },
        {
            "id": 5,
            "time": '2024-11-30 14:27:33',
            "level": 'warning',
            "source": 'Performance',
            "database": 'analytics_db',
            "user": 'analyst',
            "message": 'повільний запит виявлено',
            "details": 'Query execution time: 2.4s (threshold: 1s)',
        },
        {
            "id": 6,
            "time": '2024-11-30 14:25:10',
            "level": 'info',
            "source": 'PostgreSQL',
            "database": 'staging_db',
            "user": 'admin',
            "message": 'таблицю успішно створено',
            "details": 'CREATE TABLE test_table completed',
        },
        {
            "id": 7,
            "time": '2024-11-30 14:23:45',
            "level": 'error',
            "source": 'PostgreSQL',
            "database": 'production_db',
            "user": 'app_user',
            "message": 'deadlock виявлено',
            "details": 'ERROR: deadlock detected; Process 1234 waits for ShareLock',
        },
        {
            "id": 8,
            "time": '2024-11-30 14:20:12',
            "level": 'error',
            "source": 'Extension',
            "database": 'production_db',
            "user": 'admin',
            "message": 'розширення успішно встановлено',
            "details": 'CREATE EXTENSION pg_stat_statements',
        },
        {
            "id": 9,
            "time": '2024-11-30 14:18:30',
            "level": 'warning',
            "source": 'PostgreSQL',
            "database": 'production_db',
            "user": 'system',
            "message": 'високе використання дискового простору',
            "details": 'Database size: 8.7 GB (threshold: 8 GB)',
        },
        {
            "id": 10,
            "time": '2024-11-30 14:15:22',
            "level": 'info',
            "source": 'Backup',
            "database": 'production_db',
            "user": 'system',
            "message": 'резервне копіювання завершено успішно',
            "details": 'Backup file: production_db_2024_11_30.sql (1.2 GB)',
        },
        {
            "id": 11,
            "time": '2024-11-30 14:12:05',
            "level": 'error',
            "source": 'PostgreSQL',
            "database": 'production_db',
            "user": 'app_user',
            "message": 'порушення зовнішнього ключа',
            "details": 'ERROR: insert or update on table "orders" violates foreign key constraint',
        },
        {
            "id": 12,
            "time": '2024-11-30 14:10:33',
            "level": 'info',
            "source": 'Query',
            "database": 'analytics_db',
            "user": 'analyst',
            "message": 'звіт успішно згенеровано',
            "details": 'Monthly report generated: 15,234 rows processed',
        },
        {
            "id": 13,
            "time": '2024-11-30 14:08:18',
            "level": 'warning',
            "source": 'Replication',
            "database": 'production_db',
            "user": 'replicator',
            "message": 'затримка реплікації перевищена',
            "details": 'Replica lag: 1.2s (threshold: 500ms)',
        },
        {
            "id": 14,
            "time": '2024-11-30 14:05:47',
            "level": 'info',
            "source": 'PostgreSQL',
            "database": 'staging_db',
            "user": 'developer',
            "message": 'індекс створено успішно',
            "details": 'CREATE INDEX idx_users_email ON users(email)',
        },
        {
            "id": 15,
            "time": '2024-11-30 14:02:22',
            "level": 'error',
            "source": 'Backup',
            "database": 'production_db',
            "user": 'system',
            "message": 'помилка створення резервної копії',
            "details": 'ERROR: insufficient disk space for backup operation',
        }
    ]