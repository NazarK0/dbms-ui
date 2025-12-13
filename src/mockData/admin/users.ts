// Mock data for users management

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  status: 'active' | 'inactive';
  avatar: string;
  lastActive?: string;
  registered?: string;
  timezone: string;
}

// Get system timezone
const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const administrators: User[] = [
  {
    id: 1,
    name: 'Іван Петренко',
    email: 'ivan@company.com',
    role: 'Superadmin',
    roleColor: 'from-red-500 to-red-600',
    lastActive: '2024-12-12 14:30',
    status: 'active',
    avatar: 'IP',
    timezone: systemTimezone
  },
  {
    id: 2,
    name: 'Марія Коваленко',
    email: 'maria@company.com',
    role: 'Database Admin',
    roleColor: 'from-lime-500 to-green-600',
    lastActive: '2024-12-12 12:15',
    status: 'active',
    avatar: 'МК',
    timezone: 'Europe/London'
  },
  {
    id: 3,
    name: 'Олександр Шевченко',
    email: 'alex@company.com',
    role: 'Developer',
    roleColor: 'from-yellow-500 to-lime-600',
    lastActive: '2024-12-11 18:45',
    status: 'inactive',
    avatar: 'ОШ',
    timezone: 'America/New_York'
  },
  {
    id: 4,
    name: 'Катерина Мельник',
    email: 'kateryna@company.com',
    role: 'Analyst',
    roleColor: 'from-green-500 to-lime-600',
    lastActive: '2024-12-12 09:20',
    status: 'active',
    avatar: 'КМ',
    timezone: systemTimezone
  },
  {
    id: 5,
    name: 'Андрій Ткач',
    email: 'andriy@company.com',
    role: 'Viewer',
    roleColor: 'from-lime-600 to-yellow-600',
    lastActive: '2024-12-10 16:45',
    status: 'active',
    avatar: 'АТ',
    timezone: 'Asia/Tokyo'
  },
];

export const endUsers: User[] = [
  {
    id: 101,
    name: 'Анна Сидоренко',
    email: 'anna.s@example.com',
    role: 'Data Analyst',
    roleColor: 'from-violet-500 to-purple-600',
    registered: '2024-10-15',
    status: 'active',
    avatar: 'АС',
    timezone: systemTimezone
  },
  {
    id: 102,
    name: 'Дмитро Мельник',
    email: 'dmytro.m@example.com',
    role: 'Content Manager',
    roleColor: 'from-blue-500 to-cyan-600',
    registered: '2024-11-20',
    status: 'active',
    avatar: 'ДМ',
    timezone: 'Europe/Berlin'
  },
  {
    id: 103,
    name: 'Олена Бондаренко',
    email: 'olena.b@example.com',
    role: 'Report Viewer',
    roleColor: 'from-indigo-500 to-violet-600',
    registered: '2024-12-01',
    status: 'active',
    avatar: 'ОБ',
    timezone: systemTimezone
  },
  {
    id: 104,
    name: 'Сергій Ткаченко',
    email: 'sergiy.t@example.com',
    role: 'Guest User',
    roleColor: 'from-slate-400 to-slate-500',
    registered: '2024-12-10',
    status: 'active',
    avatar: 'СТ',
    timezone: 'Australia/Sydney'
  },
];

// Common timezones for quick selection
export const commonTimezones = [
  { value: systemTimezone, label: `Системний час`, title: `Системний час (${systemTimezone})` },
  { value: 'Europe/Kyiv', label: 'Київ', title: 'Київ (Europe/Kyiv)' },
  { value: 'Europe/London', label: 'Лондон', title: 'Лондон (Europe/London)' },
  { value: 'Europe/Berlin', label: 'Берлін', title: 'Берлін (Europe/Berlin)' },
  { value: 'Europe/Paris', label: 'Париж', title: 'Париж (Europe/Paris)' },
  { value: 'America/New_York', label: 'Нью-Йорк', title: 'Нью-Йорк (America/New_York)' },
  { value: 'America/Chicago', label: 'Чикаго', title: 'Чикаго (America/Chicago)' },
  { value: 'America/Los_Angeles', label: 'Лос-Анджелес', title: 'Лос-Анджелес (America/Los_Angeles)' },
  { value: 'Asia/Tokyo', label: 'Токіо', title: 'Токіо (Asia/Tokyo)' },
  { value: 'Asia/Shanghai', label: 'Шанхай', title: 'Шанхай (Asia/Shanghai)' },
  { value: 'Asia/Dubai', label: 'Дубай', title: 'Дубай (Asia/Dubai)' },
  { value: 'Australia/Sydney', label: 'Сідней', title: 'Сідней (Australia/Sydney)' },
];

// All available timezones (IANA timezone database)
export const allTimezones = [
  // Africa
  { value: 'Africa/Cairo', label: 'Каїр', title: 'Каїр (Africa/Cairo)' },
  { value: 'Africa/Johannesburg', label: 'Йоганнесбург', title: 'Йоганнесбург (Africa/Johannesburg)' },
  { value: 'Africa/Lagos', label: 'Лагос', title: 'Лагос (Africa/Lagos)' },
  { value: 'Africa/Nairobi', label: 'Найробі', title: 'Найробі (Africa/Nairobi)' },
  
  // Americas
  { value: 'America/Anchorage', label: 'Анкоридж', title: 'Анкоридж (America/Anchorage)' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Буенос-Айрес', title: 'Буенос-Айрес (America/Argentina/Buenos_Aires)' },
  { value: 'America/Bogota', label: 'Богота', title: 'Богота (America/Bogota)' },
  { value: 'America/Caracas', label: 'Каракас', title: 'Каракас (America/Caracas)' },
  { value: 'America/Chicago', label: 'Чикаго', title: 'Чикаго (America/Chicago)' },
  { value: 'America/Denver', label: 'Денвер', title: 'Денвер (America/Denver)' },
  { value: 'America/Los_Angeles', label: 'Лос-Анджелес', title: 'Лос-Анджелес (America/Los_Angeles)' },
  { value: 'America/Mexico_City', label: 'Мехіко', title: 'Мехіко (America/Mexico_City)' },
  { value: 'America/New_York', label: 'Нью-Йорк', title: 'Нью-Йорк (America/New_York)' },
  { value: 'America/Sao_Paulo', label: 'Сан-Паулу', title: 'Сан-Паулу (America/Sao_Paulo)' },
  { value: 'America/Toronto', label: 'Торонто', title: 'Торонто (America/Toronto)' },
  { value: 'America/Vancouver', label: 'Ванкувер', title: 'Ванкувер (America/Vancouver)' },
  
  // Asia
  { value: 'Asia/Bangkok', label: 'Бангкок', title: 'Бангкок (Asia/Bangkok)' },
  { value: 'Asia/Dubai', label: 'Дубай', title: 'Дубай (Asia/Dubai)' },
  { value: 'Asia/Hong_Kong', label: 'Гонконг', title: 'Гонконг (Asia/Hong_Kong)' },
  { value: 'Asia/Jakarta', label: 'Джакарта', title: 'Джакарта (Asia/Jakarta)' },
  { value: 'Asia/Jerusalem', label: 'Єрусалим', title: 'Єрусалим (Asia/Jerusalem)' },
  { value: 'Asia/Karachi', label: 'Карачі', title: 'Карачі (Asia/Karachi)' },
  { value: 'Asia/Kolkata', label: 'Калькутта', title: 'Калькутта (Asia/Kolkata)' },
  { value: 'Asia/Seoul', label: 'Сеул', title: 'Сеул (Asia/Seoul)' },
  { value: 'Asia/Shanghai', label: 'Шанхай', title: 'Шанхай (Asia/Shanghai)' },
  { value: 'Asia/Singapore', label: 'Сінгапур', title: 'Сінгапур (Asia/Singapore)' },
  { value: 'Asia/Tokyo', label: 'Токіо', title: 'Токіо (Asia/Tokyo)' },
  
  // Australia
  { value: 'Australia/Brisbane', label: 'Брісбен', title: 'Брісбен (Australia/Brisbane)' },
  { value: 'Australia/Melbourne', label: 'Мельбурн', title: 'Мельбурн (Australia/Melbourne)' },
  { value: 'Australia/Perth', label: 'Перт', title: 'Перт (Australia/Perth)' },
  { value: 'Australia/Sydney', label: 'Сідней', title: 'Сідней (Australia/Sydney)' },
  
  // Europe
  { value: 'Europe/Amsterdam', label: 'Амстердам', title: 'Амстердам (Europe/Amsterdam)' },
  { value: 'Europe/Athens', label: 'Афіни', title: 'Афіни (Europe/Athens)' },
  { value: 'Europe/Berlin', label: 'Берлін', title: 'Берлін (Europe/Berlin)' },
  { value: 'Europe/Brussels', label: 'Брюссель', title: 'Брюссель (Europe/Brussels)' },
  { value: 'Europe/Bucharest', label: 'Бухарест', title: 'Бухарест (Europe/Bucharest)' },
  { value: 'Europe/Budapest', label: 'Будапешт', title: 'Будапешт (Europe/Budapest)' },
  { value: 'Europe/Dublin', label: 'Дублін', title: 'Дублін (Europe/Dublin)' },
  { value: 'Europe/Helsinki', label: 'Гельсінкі', title: 'Гельсінкі (Europe/Helsinki)' },
  { value: 'Europe/Istanbul', label: 'Стамбул', title: 'Стамбул (Europe/Istanbul)' },
  { value: 'Europe/Kyiv', label: 'Київ', title: 'Київ (Europe/Kyiv)' },
  { value: 'Europe/Lisbon', label: 'Лісабон', title: 'Лісабон (Europe/Lisbon)' },
  { value: 'Europe/London', label: 'Лондон', title: 'Лондон (Europe/London)' },
  { value: 'Europe/Madrid', label: 'Мадрид', title: 'Мадрид (Europe/Madrid)' },
  { value: 'Europe/Moscow', label: 'Москва', title: 'Москва (Europe/Moscow)' },
  { value: 'Europe/Paris', label: 'Париж', title: 'Париж (Europe/Paris)' },
  { value: 'Europe/Prague', label: 'Прага', title: 'Прага (Europe/Prague)' },
  { value: 'Europe/Rome', label: 'Рим', title: 'Рим (Europe/Rome)' },
  { value: 'Europe/Stockholm', label: 'Стокгольм', title: 'Стокгольм (Europe/Stockholm)' },
  { value: 'Europe/Vienna', label: 'Відень', title: 'Відень (Europe/Vienna)' },
  { value: 'Europe/Warsaw', label: 'Варшава', title: 'Варшава (Europe/Warsaw)' },
  { value: 'Europe/Zurich', label: 'Цюрих', title: 'Цюрих (Europe/Zurich)' },
  
  // Pacific
  { value: 'Pacific/Auckland', label: 'Окленд', title: 'Окленд (Pacific/Auckland)' },
  { value: 'Pacific/Fiji', label: 'Фіджі', title: 'Фіджі (Pacific/Fiji)' },
  { value: 'Pacific/Honolulu', label: 'Гонолулу', title: 'Гонолулу (Pacific/Honolulu)' },
];