/**
 * Mock data for UserApplication
 */

/**
 * Mock initial data for EditRecord form
 * In production, this should be fetched from the database based on recordId
 */
export const getMockEditRecordData = (recordId: string) => {
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
 * Default edit record data structure
 */
export const defaultEditRecordData = {
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
