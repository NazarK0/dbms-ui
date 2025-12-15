import type { TableSchema } from './types';

// Project Management Tables - 8 tables with project tracking data
export const projectSchemas: Record<string, TableSchema> = {
  projects: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'status', type: 'varchar', required: true },
      { name: 'start_date', type: 'date', required: true },
      { name: 'end_date', type: 'date', required: false },
      { name: 'budget', type: 'decimal', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, name: 'DBMS Modernization', description: 'Модернізація системи управління БД', status: 'active', start_date: '2024-01-01', end_date: '2024-12-31', budget: '500000.00', attachments: ['project_charter.pdf', 'technical_specification.pdf', 'architecture_diagram.png'], created_at: '2023-12-15 10:00:00' },
      { id: 2, name: 'Mobile App Development', description: 'Розробка мобільного додатку', status: 'active', start_date: '2024-02-01', end_date: '2024-08-31', budget: '250000.00', attachments: ['wireframes.fig', 'design_system.pdf'], created_at: '2024-01-20 11:30:00' },
      { id: 3, name: 'Website Redesign', description: 'Редизайн корпоративного сайту', status: 'planning', start_date: '2024-03-01', end_date: '2024-06-30', budget: '100000.00', attachments: ['moodboard.pdf', 'competitor_analysis.xlsx'], created_at: '2024-02-05 14:20:00' },
      { id: 4, name: 'API Integration', description: 'Інтеграція зовнішніх API', status: 'completed', start_date: '2023-10-01', end_date: '2024-01-31', budget: '75000.00', attachments: ['api_documentation.pdf', 'integration_tests.pdf', 'completion_report.pdf'], created_at: '2023-09-25 09:45:00' },
    ],
  },

  milestones: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'project_id', type: 'integer', required: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'due_date', type: 'date', required: true },
      { name: 'status', type: 'varchar', required: true },
    ],
    data: [
      { id: 1, project_id: 1, name: 'Phase 1: Planning', description: 'Завершення планування та аналізу', due_date: '2024-02-28', status: 'completed' },
      { id: 2, project_id: 1, name: 'Phase 2: Development', description: 'Основна розробка функціоналу', due_date: '2024-06-30', status: 'in_progress' },
      { id: 3, project_id: 2, name: 'MVP Release', description: 'Реліз мінімального продукту', due_date: '2024-05-15', status: 'pending' },
      { id: 4, project_id: 3, name: 'Design Approval', description: 'Затвердження дизайну', due_date: '2024-03-15', status: 'pending' },
    ],
  },

  team_members: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'project_id', type: 'integer', required: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'role', type: 'varchar', required: true },
      { name: 'email', type: 'varchar', required: true },
      { name: 'hours_allocated', type: 'integer', required: false },
    ],
    data: [
      { id: 1, project_id: 1, name: 'Олександр Петренко', role: 'Project Manager', email: 'o.petrenko@company.com', hours_allocated: 160 },
      { id: 2, project_id: 1, name: 'Марія Коваленко', role: 'Lead Developer', email: 'm.kovalenko@company.com', hours_allocated: 200 },
      { id: 3, project_id: 1, name: 'Іван Шевченко', role: 'Backend Developer', email: 'i.shevchenko@company.com', hours_allocated: 180 },
      { id: 4, project_id: 2, name: 'Наталія Бондаренко', role: 'UI/UX Designer', email: 'n.bondarenko@company.com', hours_allocated: 120 },
      { id: 5, project_id: 2, name: 'Сергій Мельник', role: 'Frontend Developer', email: 's.melnyk@company.com', hours_allocated: 160 },
    ],
  },

  time_logs: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'project_id', type: 'integer', required: true },
      { name: 'member_id', type: 'integer', required: true },
      { name: 'task_name', type: 'varchar', required: true },
      { name: 'hours', type: 'decimal', required: true },
      { name: 'log_date', type: 'date', required: true },
      { name: 'description', type: 'text', required: false },
    ],
    data: [
      { id: 1, project_id: 1, member_id: 2, task_name: 'Database schema design', hours: '8.0', log_date: '2024-02-12', description: 'Проектування схеми БД' },
      { id: 2, project_id: 1, member_id: 3, task_name: 'API endpoints', hours: '6.5', log_date: '2024-02-12', description: 'Розробка REST API' },
      { id: 3, project_id: 2, member_id: 4, task_name: 'UI mockups', hours: '7.0', log_date: '2024-02-13', description: 'Створення макетів інтерфейсу' },
      { id: 4, project_id: 1, member_id: 1, task_name: 'Sprint planning', hours: '4.0', log_date: '2024-02-14', description: 'Планування спринту' },
    ],
  },

  sprints: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'project_id', type: 'integer', required: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'start_date', type: 'date', required: true },
      { name: 'end_date', type: 'date', required: true },
      { name: 'status', type: 'varchar', required: true },
      { name: 'goal', type: 'text', required: false },
    ],
    data: [
      { id: 1, project_id: 1, name: 'Sprint 1', start_date: '2024-01-15', end_date: '2024-01-28', status: 'completed', goal: 'Базова інфраструктура та налаштування' },
      { id: 2, project_id: 1, name: 'Sprint 2', start_date: '2024-01-29', end_date: '2024-02-11', status: 'completed', goal: 'Розробка core модулів' },
      { id: 3, project_id: 1, name: 'Sprint 3', start_date: '2024-02-12', end_date: '2024-02-25', status: 'active', goal: 'UI компоненти та інтеграція' },
      { id: 4, project_id: 2, name: 'Sprint 1', start_date: '2024-02-05', end_date: '2024-02-18', status: 'active', goal: 'Дизайн система та базовий функціонал' },
    ],
  },

  comments: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'task_id', type: 'integer', required: true },
      { name: 'author', type: 'varchar', required: true },
      { name: 'content', type: 'text', required: true },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, task_id: 1, author: 'Марія Коваленко', content: 'Потрібно уточнити вимоги по security', created_at: '2024-02-10 10:30:00' },
      { id: 2, task_id: 1, author: 'Олександр Петренко', content: 'Додав детальний опис в документацію', created_at: '2024-02-10 14:20:00' },
      { id: 3, task_id: 2, author: 'Іван Шевченко', content: 'Завершено розробку, готово до review', created_at: '2024-02-11 16:45:00' },
    ],
  },

  attachments: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'task_id', type: 'integer', required: true },
      { name: 'filename', type: 'varchar', required: true },
      { name: 'filesize', type: 'integer', required: true },
      { name: 'filetype', type: 'varchar', required: true },
      { name: 'uploaded_by', type: 'varchar', required: true },
      { name: 'uploaded_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, task_id: 1, filename: 'requirements.pdf', filesize: 2048576, filetype: 'application/pdf', uploaded_by: 'Олександр Петренко', uploaded_at: '2024-02-08 11:20:00' },
      { id: 2, task_id: 1, filename: 'schema_diagram.png', filesize: 1536000, filetype: 'image/png', uploaded_by: 'Марія Коваленко', uploaded_at: '2024-02-09 14:35:00' },
      { id: 3, task_id: 2, filename: 'api_docs.docx', filesize: 512000, filetype: 'application/docx', uploaded_by: 'Іван Шевченко', uploaded_at: '2024-02-11 09:50:00' },
    ],
  },
};