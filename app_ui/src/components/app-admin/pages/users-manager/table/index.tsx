import { Table } from '../../../../global/table';
import { SkeletonTable } from '../../../../ui/skeletons';
import columns from './columns';
import { useUsersTableData } from './useUsersTableData';


export default function UserTable() {
  const { data: users, isLoading, error } = useUsersTableData();

  if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table
      columns={columns}
      data={users!}
    />
  );
}