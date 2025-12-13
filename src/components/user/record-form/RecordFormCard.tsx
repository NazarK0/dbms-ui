import { Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import type { RecordFormCardProps } from './types';

export default function RecordFormCard({ title, description, children }: RecordFormCardProps) {
  return (
    <Card className="border-violet-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="w-5 h-5 text-violet-600" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
