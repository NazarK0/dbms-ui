import type { TableSchema } from './types';

// CRM Database Tables - 8 tables with customer relationship management data
export const crmSchemas: Record<string, TableSchema> = {
  companies: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'industry', type: 'varchar', required: false },
      { name: 'website', type: 'varchar', required: false },
      { name: 'phone', type: 'varchar', required: false },
      { name: 'email', type: 'varchar', required: false },
      { name: 'address', type: 'text', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, name: 'TechCorp Solutions', industry: 'IT', website: 'techcorp.com', phone: '+380441234567', email: 'info@techcorp.com', address: 'Київ, вул. Хрещатик, 1', attachments: ['contract_2024.pdf', 'nda.pdf', 'company_certificate.jpg'], created_at: '2024-01-10 09:00:00' },
      { id: 2, name: 'Global Trading LLC', industry: 'Trading', website: 'globaltrading.ua', phone: '+380442345678', email: 'contact@globaltrading.ua', address: 'Львів, просп. Свободи, 15', attachments: ['partnership_agreement.pdf'], created_at: '2024-01-12 10:30:00' },
      { id: 3, name: 'UkrFinance Group', industry: 'Finance', website: 'ukrfinance.com.ua', phone: '+380443456789', email: 'office@ukrfinance.com.ua', address: 'Дніпро, вул. Набережна, 23', attachments: ['financial_license.pdf', 'audit_report_2023.pdf'], created_at: '2024-01-15 14:20:00' },
      { id: 4, name: 'EcoEnergy Ltd', industry: 'Energy', website: 'ecoenergy.ua', phone: '+380444567890', email: 'sales@ecoenergy.ua', address: 'Одеса, вул. Дерибасівська, 8', attachments: [], created_at: '2024-01-18 11:45:00' },
      { id: 5, name: 'MedTech Ukraine', industry: 'Healthcare', website: 'medtech.ua', phone: '+380445678901', email: 'info@medtech.ua', address: 'Харків, вул. Сумська, 45', attachments: ['medical_license.pdf', 'iso_certificate.pdf', 'product_catalog.pdf'], created_at: '2024-01-20 16:00:00' },
    ],
  },

  contacts: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'company_id', type: 'integer', required: true },
      { name: 'first_name', type: 'varchar', required: true },
      { name: 'last_name', type: 'varchar', required: true },
      { name: 'position', type: 'varchar', required: false },
      { name: 'email', type: 'varchar', required: true },
      { name: 'phone', type: 'varchar', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, company_id: 1, first_name: 'Олександр', last_name: 'Петренко', position: 'CEO', email: 'o.petrenko@techcorp.com', phone: '+380501234567', attachments: ['business_card.jpg', 'cv.pdf'], created_at: '2024-01-10 09:30:00' },
      { id: 2, company_id: 1, first_name: 'Марія', last_name: 'Коваленко', position: 'CTO', email: 'm.kovalenko@techcorp.com', phone: '+380502345678', attachments: ['cv.pdf', 'certifications.pdf'], created_at: '2024-01-11 11:00:00' },
      { id: 3, company_id: 2, first_name: 'Іван', last_name: 'Шевченко', position: 'Director', email: 'i.shevchenko@globaltrading.ua', phone: '+380503456789', attachments: [], created_at: '2024-01-12 14:30:00' },
      { id: 4, company_id: 3, first_name: 'Наталія', last_name: 'Бондаренко', position: 'CFO', email: 'n.bondarenko@ukrfinance.com.ua', phone: '+380504567890', attachments: ['business_card.vcf'], created_at: '2024-01-15 16:45:00' },
      { id: 5, company_id: 4, first_name: 'Сергій', last_name: 'Мельник', position: 'Sales Manager', email: 's.melnyk@ecoenergy.ua', phone: '+380505678901', attachments: ['sales_presentation.pptx'], created_at: '2024-01-18 13:20:00' },
      { id: 6, company_id: 5, first_name: 'Олена', last_name: 'Ковальчук', position: 'Head of Operations', email: 'o.kovalchuk@medtech.ua', phone: '+380506789012', attachments: ['business_card.jpg'], created_at: '2024-01-20 17:10:00' },
    ],
  },

  customers: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'company_id', type: 'integer', required: false },
      { name: 'full_name', type: 'varchar', required: true },
      { name: 'email', type: 'varchar', required: true },
      { name: 'phone', type: 'varchar', required: false },
      { name: 'status', type: 'varchar', required: true },
      { name: 'lifetime_value', type: 'decimal', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, company_id: 1, full_name: 'Андрій Сидоренко', email: 'a.sydorenko@example.com', phone: '+380671234567', status: 'active', lifetime_value: '45000.00', attachments: ['contract_signed.pdf', 'passport_copy.pdf'], created_at: '2024-01-05 10:00:00' },
      { id: 2, company_id: 2, full_name: 'Юлія Павленко', email: 'y.pavlenko@example.com', phone: '+380672345678', status: 'active', lifetime_value: '32000.00', attachments: ['agreement.pdf'], created_at: '2024-01-08 11:30:00' },
      { id: 3, company_id: null, full_name: 'Дмитро Литвиненко', email: 'd.lytvynenko@example.com', phone: '+380673456789', status: 'prospect', lifetime_value: '0.00', attachments: [], created_at: '2024-01-10 14:20:00' },
      { id: 4, company_id: 3, full_name: 'Тетяна Захарченко', email: 't.zakharchenko@example.com', phone: '+380674567890', status: 'active', lifetime_value: '78000.00', attachments: ['contract.pdf', 'invoice_001.pdf', 'invoice_002.pdf'], created_at: '2024-01-12 09:45:00' },
      { id: 5, company_id: 4, full_name: 'Володимир Гриценко', email: 'v.hrytsenko@example.com', phone: '+380675678901', status: 'inactive', lifetime_value: '12000.00', attachments: ['old_contract.pdf'], created_at: '2024-01-15 16:30:00' },
    ],
  },

  deals: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'customer_id', type: 'integer', required: true },
      { name: 'title', type: 'varchar', required: true },
      { name: 'amount', type: 'decimal', required: true },
      { name: 'stage', type: 'varchar', required: true },
      { name: 'probability', type: 'integer', required: false },
      { name: 'close_date', type: 'date', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, customer_id: 1, title: 'Enterprise License', amount: '25000.00', stage: 'negotiation', probability: 75, close_date: '2024-03-15', attachments: ['proposal.pdf', 'pricing.xlsx', 'demo_recording.mp4'], created_at: '2024-02-01 10:00:00' },
      { id: 2, customer_id: 2, title: 'Annual Support Contract', amount: '12000.00', stage: 'proposal', probability: 60, close_date: '2024-03-01', attachments: ['service_agreement.pdf'], created_at: '2024-02-03 11:30:00' },
      { id: 3, customer_id: 4, title: 'Custom Development', amount: '45000.00', stage: 'discovery', probability: 40, close_date: '2024-04-20', attachments: ['requirements_spec.pdf', 'technical_proposal.pdf'], created_at: '2024-02-05 14:20:00' },
      { id: 4, customer_id: 1, title: 'Training Services', amount: '8000.00', stage: 'won', probability: 100, close_date: '2024-02-15', attachments: ['signed_contract.pdf', 'payment_receipt.pdf'], created_at: '2024-02-08 09:45:00' },
    ],
  },

  activities: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'customer_id', type: 'integer', required: true },
      { name: 'type', type: 'varchar', required: true },
      { name: 'subject', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'completed', type: 'boolean', required: true },
      { name: 'activity_date', type: 'timestamp', required: true },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, customer_id: 1, type: 'call', subject: 'Дзвінок по угоді', description: 'Обговорення умов контракту', completed: true, activity_date: '2024-02-10 10:00:00', created_at: '2024-02-09 15:30:00' },
      { id: 2, customer_id: 2, type: 'meeting', subject: 'Презентація продукту', description: 'Демонстрація функціоналу', completed: true, activity_date: '2024-02-11 14:00:00', created_at: '2024-02-10 09:20:00' },
      { id: 3, customer_id: 4, type: 'email', subject: 'Надіслано пропозицію', description: 'Комерційна пропозиція', completed: true, activity_date: '2024-02-12 09:30:00', created_at: '2024-02-12 09:30:00' },
      { id: 4, customer_id: 1, type: 'task', subject: 'Підготувати договір', description: 'Юридична документація', completed: false, activity_date: '2024-02-15 10:00:00', created_at: '2024-02-13 11:45:00' },
    ],
  },

  notes: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'customer_id', type: 'integer', required: true },
      { name: 'title', type: 'varchar', required: true },
      { name: 'content', type: 'text', required: true },
      { name: 'author', type: 'varchar', required: true },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, customer_id: 1, title: 'Перша зустріч', content: 'Клієнт зацікавлений в enterprise рішенні', author: 'Марія Коваленко', created_at: '2024-02-05 14:20:00' },
      { id: 2, customer_id: 2, title: 'Технічні вимоги', content: 'Потрібна інтеграція з SAP', author: 'Олександр Петренко', created_at: '2024-02-07 11:30:00' },
      { id: 3, customer_id: 4, title: 'Бюджетні обмеження', content: 'Максимальний бюджет 50000', author: 'Іван Шевченко', created_at: '2024-02-09 16:45:00' },
    ],
  },

  tasks: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'title', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'assignee', type: 'varchar', required: true },
      { name: 'status', type: 'varchar', required: true },
      { name: 'priority', type: 'varchar', required: true },
      { name: 'due_date', type: 'date', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, title: 'Підготувати презентацію', description: 'Для клієнта TechCorp', assignee: 'Марія Коваленко', status: 'in_progress', priority: 'high', due_date: '2024-02-18', created_at: '2024-02-12 10:00:00' },
      { id: 2, title: 'Зателефонувати клієнту', description: 'Follow-up дзвінок', assignee: 'Іван Шевченко', status: 'pending', priority: 'medium', due_date: '2024-02-16', created_at: '2024-02-13 11:30:00' },
      { id: 3, title: 'Оновити CRM дані', description: 'Внести нові контакти', assignee: 'Олена Ковальчук', status: 'completed', priority: 'low', due_date: '2024-02-14', created_at: '2024-02-10 09:20:00' },
    ],
  },

  emails: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'customer_id', type: 'integer', required: true },
      { name: 'subject', type: 'varchar', required: true },
      { name: 'from_email', type: 'varchar', required: true },
      { name: 'to_email', type: 'varchar', required: true },
      { name: 'body', type: 'text', required: true },
      { name: 'sent_at', type: 'timestamp', required: true },
    ],
    data: [
      { id: 1, customer_id: 1, subject: 'Re: Enterprise License', from_email: 'm.kovalenko@techcorp.com', to_email: 'a.sydorenko@example.com', body: 'Дякуємо за зацікавленість. Надсилаю комерційну пропозицію...', sent_at: '2024-02-10 14:30:00' },
      { id: 2, customer_id: 2, subject: 'Meeting Confirmation', from_email: 'i.shevchenko@globaltrading.ua', to_email: 'y.pavlenko@example.com', body: 'Підтверджую зустріч на завтра о 14:00...', sent_at: '2024-02-11 09:15:00' },
      { id: 3, customer_id: 4, subject: 'Technical Requirements', from_email: 't.zakharchenko@example.com', to_email: 'o.petrenko@techcorp.com', body: 'Надсилаю список технічних вимог до системи...', sent_at: '2024-02-12 11:20:00' },
    ],
  },
};