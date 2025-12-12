import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type UserType = 'admin' | 'user';

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: UserType;
}

export default function CreateUserModal({ open, onOpenChange, userType }: CreateUserModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Створити {userType === 'admin' ? 'адміністратора' : 'користувача'}
          </DialogTitle>
          <DialogDescription>
            {userType === 'admin' 
              ? 'Налаштуйте дані адміністратора з доступом до панелі управління'
              : 'Створіть нового користувача застосунку'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">Ім'я</Label>
              <Input id="first-name" placeholder="Іван" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="last-name">Прізвище</Label>
              <Input id="last-name" placeholder="Петренко" className="mt-2" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@example.com" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="role">Роль</Label>
            <select id="role" className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
              {userType === 'admin' ? (
                <>
                  <option value="superadmin">Superadmin</option>
                  <option value="dbadmin">Database Admin</option>
                  <option value="developer">Developer</option>
                  <option value="analyst">Analyst</option>
                  <option value="viewer">Viewer</option>
                </>
              ) : (
                <>
                  <option value="premium">Premium User</option>
                  <option value="standard">Standard User</option>
                  <option value="free">Free User</option>
                  <option value="trial">Trial User</option>
                </>
              )}
            </select>
          </div>
          {userType === 'admin' && (
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••" className="mt-2" />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            <Plus className="w-4 h-4 mr-2" />
            Створити {userType === 'admin' ? 'адміністратора' : 'користувача'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
