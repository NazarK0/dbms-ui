// Central exports for Audit Log components
import { useState, useEffect } from 'react';

import AuditStatisticsCards from './AuditStatisticsCards';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid } from '../../../ui/skeletons';
import LogTable from './table';
import ActionStatsPanel from './actions-stats-panel';

export default function AuditLog() {
    // Loading states
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [statistics, setStatistics] = useState<any>(null);


    useEffect(() => {
        // Load statistics
        api.get(API.admin.auditLog.statistics())
            .then((data) => {
                setStatistics(data);
                setIsLoadingStats(false);
            })
            .catch((error) => {
                console.error('Error loading statistics:', error);
                setIsLoadingStats(false);
            });
    }, []);

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            {isLoadingStats ? (
                <SkeletonCardGrid count={4} columns={4} cardType="stat" />
            ) : (
                statistics && <AuditStatisticsCards statistics={statistics} />
            )}

            <ActionStatsPanel />
            <LogTable />
        </div>
    );
}

export * from './types';
export * from './utils';