const getStatusBadgeClass = (status: 'success' | 'failed'): string => {
  return status === 'success'
    ? 'bg-green-50 text-green-700 border-green-300'
    : 'bg-red-50 text-red-700 border-red-300';
};

export default getStatusBadgeClass;
