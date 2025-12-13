/**
 * Mock record data for user application
 * This represents table records that users can edit/view
 */

export interface RecordData {
  id: string;
  name: string;
  email: string;
  bio: string;
  age: number;
  is_active: boolean;
  role: string;
  department: string;
  phone: string;
  address: string;
  notes: string;
  created_at: string;
  updated_at: string;
  attachments: string[];
}

/**
 * Get mock edit record data by ID
 * In production, this would be an API call to fetch record from database
 */
export const getMockEditRecordData = (recordId: string): RecordData => {
  // In production, this would be an API call:
  // const data = await fetch(`/api/records/${recordId}`);
  // return data.json();

  return {
    id: recordId,
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer',
    age: 30,
    is_active: true,
    role: 'admin',
    department: 'Engineering',
    phone: '+380501234567',
    address: 'Kyiv, Ukraine',
    notes: 'Some notes',
    created_at: '2024-01-15T10:30:00',
    updated_at: '2024-02-10T14:20:00',
    attachments: ['resume.pdf', 'certificate.jpg', 'project-plan.xlsx'],
  };
};

/**
 * Default empty record structure
 */
export const defaultRecordData: RecordData = {
  id: '',
  name: '',
  email: '',
  bio: '',
  age: 0,
  is_active: false,
  role: '',
  department: '',
  phone: '',
  address: '',
  notes: '',
  created_at: '',
  updated_at: '',
  attachments: [],
};
