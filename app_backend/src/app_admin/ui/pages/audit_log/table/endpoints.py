from typing import List
from app_admin.ui.pages.audit_log.table.schema import AuditLogTableItem

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



table_router = APIRouter()

@table_router.get("/", response_model=List[AuditLogTableItem])
def get_audit_log_table(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
         {
    "id": '1',
    "time": '2024-12-12 14:23:15',
    "user": 'admin',
    "action": 'create',
    "category": 'База даних',
    "target": 'production_v2',
    "details": 'Створено нову базу даних з кодуванням UTF-8',
    "ipAddress": '192.168.1.100',
    "status": 'success',
  },
  {
    "id": '2',
    "time": '2024-12-12 14:15:42',
    "user": 'developer',
    "action": 'update',
    "category": 'Таблиця',
    "target": 'users.email',
    "details": 'Змінено тип поля з VARCHAR(255) на TEXT',
    "ipAddress": '192.168.1.105',
    "status": 'success',
  },
  {
    "id": '3',
    "time": '2024-12-12 14:08:33',
    "user": 'analyst',
    "action": 'select',
    "category": 'Запит',
    "target": 'SELECT * FROM orders',
    "details": 'Виконано SELECT запит, повернуто 1523 рядки',
    "ipAddress": '192.168.1.110',
    "status": 'success',
  },
  {
    "id": '4',
    "time": '2024-12-12 13:55:19',
    "user": 'admin',
    "action": 'grant',
    "category": 'Права доступу',
    "target": 'developer → staging_db',
    "details": 'Надано права SELECT, INSERT, UPDATE на staging_db',
    "ipAddress": '192.168.1.100',
    "status": 'success',
  },
  {
    "id": '5',
    "time": '2024-12-12 13:42:07',
    "user": 'app_user',
    "action": 'delete',
    "category": 'Таблиця',
    "target": 'temp_cache',
    "details": 'Видалено 342 застарілих записів з таблиці',
    "ipAddress": '10.0.0.45',
    "status": 'success',
  },
  {
    "id": '6',
    "time": '2024-12-12 13:30:25',
    "user": 'backup_service',
    "action": 'backup',
    "category": 'Резервна копія',
    "target": 'production_db',
    "details": 'Створено повну резервну копію (2.3 GB)',
    "ipAddress": '10.0.0.50',
    "status": 'success',
  },
  {
    "id": '7',
    "time": '2024-12-12 13:15:52',
    "user": 'developer',
    "action": 'create',
    "category": 'Функція',
    "target": 'calculate_order_total()',
    "details": 'Створено PL/pgSQL функцію для розрахунку суми замовлень',
    "ipAddress": '192.168.1.105',
    "status": 'success',
  },
  {
    "id": '8',
    "time": '2024-12-12 12:58:41',
    "user": 'developer',
    "action": 'delete',
    "category": 'База даних',
    "target": 'test_old',
    "details": 'Спроба видалення бази даних (відмовлено - активні підключення)',
    "ipAddress": '192.168.1.105',
    "status": 'failed',
  },
  {
    "id": '9',
    "time": '2024-12-12 12:45:18',
    "user": 'admin',
    "action": 'create',
    "category": 'Користувач',
    "target": 'new_analyst',
    "details": 'Створено нового користувача з роллю Analyst',
    "ipAddress": '192.168.1.100',
    "status": 'success',
  },
  {
    "id": '10',
    "time": '2024-12-12 12:30:09',
    "user": 'analyst',
    "action": 'login',
    "category": 'Автентифікація',
    "target": 'PostgreSQL Server',
    "details": 'Успішний вхід в систему',
    "ipAddress": '192.168.1.110',
    "status": 'success',
  },
  {
    "id": '11',
    "time": '2024-12-12 12:15:33',
    "user": 'developer',
    "action": 'create',
    "category": 'Тригер',
    "target": 'before_user_update',
    "details": 'Створено тригер для валідації даних перед оновленням',
    "ipAddress": '192.168.1.105',
    "status": 'success',
  },
  {
    "id": '12',
    "time": '2024-12-12 11:58:22',
    "user": 'admin',
    "action": 'revoke',
    "category": 'Права доступу',
    "target": 'temp_user → production_db',
    "details": 'Відкликано всі права доступу до production_db',
    "ipAddress": '192.168.1.100',
    "status": 'success',
  },
        
    ]
