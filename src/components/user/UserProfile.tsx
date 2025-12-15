import { useState, useEffect } from 'react';
import { UserInfoCard, DatabaseAccessCard } from './profile';
import { mockApiCall } from '../../utils/mockApi';
import { SkeletonCard } from '../ui/skeletons';

interface UserProfileProps {
  userRoles: string[];
  onBack: () => void;
}

export default function UserProfile({ userRoles, onBack }: UserProfileProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await mockApiCall('user-profile', {}, 900);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-10 bg-slate-200 rounded animate-pulse" />
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 className="text-slate-900">Профіль користувача</h1>
      </div>

      {/* Profile Content */}
      <div className="grid gap-6 md:grid-cols-2">
        <UserInfoCard />
        <DatabaseAccessCard userRoles={userRoles} />
      </div>
    </div>
  );
}
