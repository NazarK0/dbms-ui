// Central exports for Audit Log components
import { useState, useEffect } from 'react';

import AuditStatisticsCards from './AuditStatisticsCards';
import ActionTypeStats from './ActionTypeStats';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid, SkeletonChart } from '../../../ui/skeletons';
import LogTable from './table';

export default function AuditLog() {
    // Loading states
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [isLoadingChart, setIsLoadingChart] = useState(true);
    const [statistics, setStatistics] = useState<any>(null);
    const [actionTypeStats, setActionTypeStats] = useState<any>(null);


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

        // Load action type stats
        api.get(API.admin.auditLog.actionStats())
            .then((data) => {
                setActionTypeStats(data);
                setIsLoadingChart(false);
            })
            .catch((error) => {
                console.error('Error loading action stats:', error);
                setIsLoadingChart(false);
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

            {/* Action Type Statistics */}
            {isLoadingChart ? (
                <SkeletonChart />
            ) : (
                actionTypeStats && <ActionTypeStats statistics={actionTypeStats} />
            )}

            <LogTable />
        </div>
    );
}

export * from './types';
export * from './utils';