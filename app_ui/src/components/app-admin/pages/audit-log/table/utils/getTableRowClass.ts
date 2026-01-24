const getTableRowClass = (status: 'success' | 'failed'): string => {
  return status === 'failed' ? 'bg-red-50/50' : '';
};

export default getTableRowClass;
