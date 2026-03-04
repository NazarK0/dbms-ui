/**
 * RLS Configuration Panel
 * Manages Row Level Security rules for a role
 */

import { useState } from 'react';
import { Card, CardContent} from '../../../../../ui/card';
import { Button } from '../../../../../ui/button';
import { Input } from '../../../../../ui/input';
import { Label } from '../../../../../ui/label';
import { Switch } from '../../../../../ui/switch';
import { Badge } from '../../../../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import { Plus, Trash2, Shield, Database } from 'lucide-react';
import type { RLSRule } from './types';

interface RLSConfigPanelProps {
  roleId: string;
  roleName: string;
  rules: RLSRule[];
  databases: string[];
  onRulesChange: (roleId: string, rules: RLSRule[]) => void;
  onDatabasesChange: (roleId: string, databases: string[]) => void;
}

const SAMPLE_DATABASES = ['main_db', 'analytics_db', 'content_db', 'user_data_db'];
const SAMPLE_TABLES = ['users', 'posts', 'comments', 'orders', 'products'];
const OPERATIONS: Array<'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE'> = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];

export default function RLSConfigPanel({
  roleId,
  roleName,
  rules,
  databases,
  onRulesChange,
  onDatabasesChange,
}: RLSConfigPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const addRule = () => {
    const newRule: RLSRule = {
      id: `rls-${Date.now()}`,
      table: SAMPLE_TABLES[0],
      operation: 'SELECT',
      condition: 'user_id = current_user_id()',
      enabled: true,
    };
    onRulesChange(roleId, [...rules, newRule]);
  };

  const updateRule = (ruleId: string, updates: Partial<RLSRule>) => {
    const updatedRules = rules.map((rule) =>
      rule.id === ruleId ? { ...rule, ...updates } : rule
    );
    onRulesChange(roleId, updatedRules);
  };

  const deleteRule = (ruleId: string) => {
    const updatedRules = rules.filter((rule) => rule.id !== ruleId);
    onRulesChange(roleId, updatedRules);
  };

  const toggleDatabase = (database: string) => {
    const updatedDatabases = databases.includes(database)
      ? databases.filter((db) => db !== database)
      : [...databases, database];
    onDatabasesChange(roleId, updatedDatabases);
  };

  const activeRules = rules.filter((r) => r.enabled).length;

  return (
    <div className="space-y-3">
      {/* Header with Toggle */}
      <div
        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Shield className="h-4 w-4 text-violet-600" />
          <div>
            <div className="text-sm font-medium text-slate-900">Row Level Security</div>
            <div className="text-xs text-slate-500">
              {activeRules} активних правил • {databases.length} БД
            </div>
          </div>
        </div>
        <Badge variant={activeRules > 0 ? 'default' : 'outline'}>
          {isExpanded ? 'Згорнути' : 'Розгорнути'}
        </Badge>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <Card className="border-violet-200">
          <CardContent className="p-4 space-y-4">
            {/* Database Selection */}
            <div className="space-y-2">
              <Label className="text-xs text-slate-600 flex items-center gap-2">
                <Database className="h-3 w-3" />
                Доступ до баз даних
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_DATABASES.map((db) => (
                  <div
                    key={db}
                    className={`flex items-center justify-between p-2 rounded border transition-all ${
                      databases.includes(db)
                        ? 'border-violet-300 bg-violet-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <span className="text-sm text-slate-700">{db}</span>
                    <Switch
                      checked={databases.includes(db)}
                      onCheckedChange={() => toggleDatabase(db)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RLS Rules */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-slate-600">RLS Правила</Label>
                <Button variant="outline" size="sm" onClick={addRule}>
                  <Plus className="h-3 w-3 mr-1" />
                  Додати
                </Button>
              </div>

              {rules.length === 0 ? (
                <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center">
                  <p className="text-sm text-slate-500">Немає правил RLS</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Додайте правило для контролю доступу до рядків
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {rules.map((rule) => (
                    <Card
                      key={rule.id}
                      className={`${
                        rule.enabled ? 'border-violet-200 bg-violet-50/30' : 'border-slate-200'
                      }`}
                    >
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={(enabled: boolean) =>
                              updateRule(rule.id, { enabled })
                            }
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRule(rule.id)}
                            className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs text-slate-600">Таблиця</Label>
                            <Select
                              value={rule.table}
                              onValueChange={(table: any) => updateRule(rule.id, { table })}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SAMPLE_TABLES.map((table) => (
                                  <SelectItem key={table} value={table}>
                                    {table}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-xs text-slate-600">Операція</Label>
                            <Select
                              value={rule.operation}
                              onValueChange={(operation: string) =>
                                updateRule(rule.id, {
                                  operation: operation as RLSRule['operation'],
                                })
                              }
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {OPERATIONS.map((op) => (
                                  <SelectItem key={op} value={op}>
                                    {op}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-slate-600">Умова</Label>
                          <Input
                            value={rule.condition}
                            onChange={(e) =>
                              updateRule(rule.id, { condition: e.target.value })
                            }
                            placeholder="user_id = current_user_id()"
                            className="h-8 text-xs font-mono"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
