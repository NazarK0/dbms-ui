import { UserApplication } from './components/user';

interface UserProps {
  onBack: () => void;
}

export default function User({ onBack }: UserProps) {
  return <UserApplication onBack={onBack} />;
}
