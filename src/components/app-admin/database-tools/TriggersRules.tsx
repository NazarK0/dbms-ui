import { useState, useEffect } from 'react';
import { TriggersTable, RulesTable } from './triggers-rules';
import { triggers as allTriggers, rules as allRules } from '@/mockData/admin/triggers';
import type { TriggersRulesProps, Trigger, Rule } from './triggers-rules/types';
import { API, api } from '../../../utils/api';
import { SkeletonTable } from '../../ui/skeletons';

export default function TriggersRules({ selectedDatabase }: TriggersRulesProps) {
  const [isLoadingTriggers, setIsLoadingTriggers] = useState(true);
  const [isLoadingRules, setIsLoadingRules] = useState(true);
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    // Load triggers
    api.get(API.admin.databaseTools.triggers.list(), { database: selectedDatabase })
      .then((data) => {
        setTriggers(data);
        setIsLoadingTriggers(false);
      })
      .catch((error) => {
        console.error('Error loading triggers:', error);
        setIsLoadingTriggers(false);
      });

    // Load rules - assuming there's an endpoint for rules
    // If not in endpoints, you may need to add it to api-endpoints.json
    api.get(API.admin.databaseTools.triggers.list(), { database: selectedDatabase, type: 'rules' })
      .then((data) => {
        setRules(data);
        setIsLoadingRules(false);
      })
      .catch((error) => {
        console.error('Error loading rules:', error);
        setIsLoadingRules(false);
      });
  }, [selectedDatabase]);

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
      {isLoadingTriggers ? (
        <SkeletonTable rows={5} columns={6} showActions />
      ) : (
        <TriggersTable
          triggers={triggers}
          selectedDatabase={selectedDatabase}
          onCreateTrigger={handleCreateTrigger}
          onEditTrigger={handleEditTrigger}
          onDeleteTrigger={handleDeleteTrigger}
        />
      )}

      {isLoadingRules ? (
        <SkeletonTable rows={4} columns={5} showActions />
      ) : (
        <RulesTable
          rules={rules}
          onCreateRule={handleCreateRule}
          onEditRule={handleEditRule}
          onDeleteRule={handleDeleteRule}
        />
      )}
    </div>
  );
}