import type { TableSchema } from './types';

// Content Database Tables - 7 tables with CMS content data
export const contentSchemas: Record<string, TableSchema> = {
  articles: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'title', type: 'varchar', required: true },
      { name: 'slug', type: 'varchar', required: true },
      { name: 'content', type: 'text', required: true },
      { name: 'author_id', type: 'integer', required: true },
      { name: 'status', type: 'varchar', required: true },
      { name: 'published_at', type: 'timestamp', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, title: 'Впровадження DBMS у великих підприємствах', slug: 'dbms-implementation', content: 'Стаття про впровадження систем управління базами даних...', author_id: 1, status: 'published', published_at: '2024-02-01 10:00:00', attachments: ['featured_image.jpg', 'infographic.png', 'case_study.pdf'], created_at: '2024-01-28 14:30:00' },
      { id: 2, title: 'Оптимізація запитів PostgreSQL', slug: 'postgres-optimization', content: 'Поради з оптимізації SQL запитів...', author_id: 2, status: 'published', published_at: '2024-02-05 11:30:00', attachments: ['hero_image.jpg', 'performance_chart.png'], created_at: '2024-02-03 09:20:00' },
      { id: 3, title: 'Безпека баз даних: найкращі практики', slug: 'database-security', content: 'Огляд підходів до захисту даних...', author_id: 1, status: 'draft', published_at: null, attachments: ['draft_image.jpg'], created_at: '2024-02-10 16:45:00' },
    ],
  },

  pages: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'title', type: 'varchar', required: true },
      { name: 'slug', type: 'varchar', required: true },
      { name: 'content', type: 'text', required: true },
      { name: 'template', type: 'varchar', required: true },
      { name: 'is_active', type: 'boolean', required: true },
      { name: 'attachments', type: 'array', required: false },
      { name: 'updated_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, title: 'Головна сторінка', slug: 'home', content: 'Вітаємо на нашому сайті...', template: 'homepage', is_active: true, attachments: ['hero_banner.jpg', 'logo.svg'], updated_at: '2024-02-10 10:00:00' },
      { id: 2, title: 'Про нас', slug: 'about', content: 'Інформація про компанію...', template: 'standard', is_active: true, attachments: ['team_photo.jpg', 'office.jpg', 'company_brochure.pdf'], updated_at: '2024-01-15 11:30:00' },
      { id: 3, title: 'Контакти', slug: 'contacts', content: 'Зв\'яжіться з нами...', template: 'contacts', is_active: true, attachments: ['map.jpg'], updated_at: '2024-01-20 14:20:00' },
    ],
  },

  media: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'filename', type: 'varchar', required: true },
      { name: 'filepath', type: 'varchar', required: true },
      { name: 'filetype', type: 'varchar', required: true },
      { name: 'filesize', type: 'integer', required: true },
      { name: 'uploaded_by', type: 'varchar', required: true },
      { name: 'uploaded_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, filename: 'header-image.jpg', filepath: '/media/2024/02/header-image.jpg', filetype: 'image/jpeg', filesize: 2048576, uploaded_by: 'Наталія Бондаренко', uploaded_at: '2024-02-01 10:00:00' },
      { id: 2, filename: 'logo.png', filepath: '/media/2024/01/logo.png', filetype: 'image/png', filesize: 512000, uploaded_by: 'Марія Коваленко', uploaded_at: '2024-01-15 11:30:00' },
      { id: 3, filename: 'document.pdf', filepath: '/media/2024/02/document.pdf', filetype: 'application/pdf', filesize: 3145728, uploaded_by: 'Олена Ковальчук', uploaded_at: '2024-02-08 14:20:00' },
    ],
  },

  tags: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'slug', type: 'varchar', required: true },
      { name: 'usage_count', type: 'integer', required: true },
    ],
    data: [
      { id: 1, name: 'PostgreSQL', slug: 'postgresql', usage_count: 45 },
      { id: 2, name: 'Безпека', slug: 'security', usage_count: 32 },
      { id: 3, name: 'Оптимізація', slug: 'optimization', usage_count: 28 },
      { id: 4, name: 'Архітектура', slug: 'architecture', usage_count: 21 },
    ],
  },

  authors: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'email', type: 'varchar', required: true },
      { name: 'bio', type: 'text', required: false },
      { name: 'avatar_url', type: 'varchar', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'articles_count', type: 'integer', required: true },
    ],
    data: [
      { id: 1, name: 'Олександр Петренко', email: 'o.petrenko@company.com', bio: 'Senior Database Architect', avatar_url: '/avatars/petrenko.jpg', attachments: ['cv.pdf', 'certifications.pdf'], articles_count: 15 },
      { id: 2, name: 'Марія Коваленко', email: 'm.kovalenko@company.com', bio: 'Lead Developer', avatar_url: '/avatars/kovalenko.jpg', attachments: ['portfolio.pdf'], articles_count: 12 },
      { id: 3, name: 'Іван Шевченко', email: 'i.shevchenko@company.com', bio: 'Backend Specialist', avatar_url: '/avatars/shevchenko.jpg', attachments: [], articles_count: 8 },
    ],
  },
};