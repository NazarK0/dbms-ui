// Mock data for database functions (Admin)

export interface DatabaseFunction {
  name: string;
  schema: string;
  returns: string;
  language: string;
  arguments: string;
  description: string;
  code?: string;
}

export const functions: DatabaseFunction[] = [
  {
    name: 'calculate_total',
    schema: 'public',
    returns: 'decimal',
    language: 'plpgsql',
    arguments: 'order_id integer',
    description: 'Обчислює загальну суму замовлення',
    code: `CREATE OR REPLACE FUNCTION calculate_total(order_id integer)
RETURNS decimal AS $$
DECLARE
  total decimal;
BEGIN
  SELECT SUM(quantity * price) INTO total
  FROM order_items
  WHERE order_id = $1;
  
  RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;`,
  },
  {
    name: 'update_timestamp',
    schema: 'public',
    returns: 'trigger',
    language: 'plpgsql',
    arguments: '',
    description: 'Оновлює timestamp при зміні запису',
    code: `CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`,
  },
  {
    name: 'get_user_stats',
    schema: 'public',
    returns: 'TABLE',
    language: 'sql',
    arguments: 'user_id integer',
    description: 'Повертає статистику користувача',
    code: `CREATE OR REPLACE FUNCTION get_user_stats(user_id integer)
RETURNS TABLE(total_orders integer, total_spent decimal) AS $$
  SELECT COUNT(*) as total_orders, SUM(total) as total_spent
  FROM orders
  WHERE user_id = $1;
$$ LANGUAGE sql;`,
  },
];

export const functionCode = `CREATE OR REPLACE FUNCTION calculate_total(order_id integer)
RETURNS decimal AS $$
DECLARE
  total decimal;
BEGIN
  SELECT SUM(quantity * price) INTO total
  FROM order_items
  WHERE order_id = $1;
  
  RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;`;
