import RoleCard, { Role } from './RoleCard';

interface RolesGridProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onSelect: (name: string) => void;
  onDelete?: (role: Role) => void;
}

export default function RolesGrid({ roles, onEdit, onSelect, onDelete }: RolesGridProps) {
  return (
    <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2.5">
      {roles.map((role) => (
        <RoleCard
          key={role.name}
          role={role}
          onEdit={onEdit}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
