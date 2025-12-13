// Mock data for custom data types (Admin)

export interface DomainType {
  name: string;
  category: 'domain';
  baseType: string;
  constraint: string;
  description: string;
}

export interface CompositeType {
  name: string;
  category: 'composite';
  attributes: Array<{ name: string; type: string }>;
  description: string;
}

export interface EnumType {
  name: string;
  category: 'enum';
  values: string[];
  description: string;
}

export const domainTypes: DomainType[] = [
  {
    name: 'email',
    category: 'domain',
    baseType: 'varchar(255)',
    constraint: 'CHECK (VALUE ~ \'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$\')',
    description: 'Валідний email адрес',
  },
  {
    name: 'phone_number',
    category: 'domain',
    baseType: 'varchar(20)',
    constraint: 'CHECK (VALUE ~ \'^\\+?[0-9]{10,15}$\')',
    description: 'Міжнародний телефонний номер',
  },
  {
    name: 'currency_code',
    category: 'domain',
    baseType: 'char(3)',
    constraint: 'CHECK (LENGTH(VALUE) = 3)',
    description: 'ISO 4217 код валюти',
  },
];

export const compositeTypes: CompositeType[] = [
  {
    name: 'address',
    category: 'composite',
    attributes: [
      { name: 'street', type: 'text' },
      { name: 'city', type: 'varchar(100)' },
      { name: 'postal_code', type: 'varchar(20)' },
      { name: 'country', type: 'varchar(100)' },
    ],
    description: 'Поштова адреса',
  },
  {
    name: 'geo_point',
    category: 'composite',
    attributes: [
      { name: 'latitude', type: 'decimal(10,8)' },
      { name: 'longitude', type: 'decimal(11,8)' },
    ],
    description: 'Географічні координати',
  },
];

export const enumTypes: EnumType[] = [
  {
    name: 'user_status',
    category: 'enum',
    values: ['active', 'inactive', 'suspended', 'banned'],
    description: 'Статус користувача',
  },
  {
    name: 'order_status',
    category: 'enum',
    values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    description: 'Статус замовлення',
  },
  {
    name: 'priority_level',
    category: 'enum',
    values: ['low', 'medium', 'high', 'critical'],
    description: 'Рівень пріоритету',
  },
];
