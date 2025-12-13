import { TriggersTable, RulesTable } from './triggers-rules';
import { triggers as allTriggers, rules as allRules } from '@/mockData/admin/triggers';
import type { TriggersRulesProps, Trigger, Rule } from './triggers-rules/types';

export default function TriggersRules({ selectedDatabase }: TriggersRulesProps) {
  const handleCreateTrigger = () => {
    console.log('Create trigger');
  };

  const handleEditTrigger = (trigger: Trigger) => {
    console.log('Edit trigger:', trigger.name);
  };

  const handleDeleteTrigger = (trigger: Trigger) => {
    console.log('Delete trigger:', trigger.name);
  };

  const handleCreateRule = () => {
    console.log('Create rule');
  };

  const handleEditRule = (rule: Rule) => {
    console.log('Edit rule:', rule.name);
  };

  const handleDeleteRule = (rule: Rule) => {
    console.log('Delete rule:', rule.name);
  };

  return (
    <div className="space-y-6">
      <TriggersTable
        triggers={allTriggers}
        selectedDatabase={selectedDatabase}
        onCreateTrigger={handleCreateTrigger}
        onEditTrigger={handleEditTrigger}
        onDeleteTrigger={handleDeleteTrigger}
      />

      <RulesTable
        rules={allRules}
        onCreateRule={handleCreateRule}
        onEditRule={handleEditRule}
        onDeleteRule={handleDeleteRule}
      />
    </div>
  );
}