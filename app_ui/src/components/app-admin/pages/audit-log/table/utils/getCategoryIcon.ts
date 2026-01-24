import { Database, Table as TableIcon, FileCode, Shield, Copy, Activity, User } from 'lucide-react';


const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'База даних':
      return Database;
    case 'Таблиця':
      return TableIcon;
    case 'Запит':
      return FileCode;
    case 'Права доступу':
      return Shield;
    case 'Резервна копія':
      return Copy;
    case 'Функція':
      return Activity;
    case 'Тригер':
      return Activity;
    case 'Користувач':
      return User;
    case 'Автентифікація':
      return Shield;
    default:
      return Activity;
  }
};

export default getCategoryIcon;
