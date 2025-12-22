import { Shield } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '../../../../ui/card';

export default function MatrixHeader() {
  return (
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <CardTitle>Матриця прав доступу (RBAC)</CardTitle>
          <CardDescription>
            Налаштування дозволів для ролей адміністраторів та користувачів
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  );
}
