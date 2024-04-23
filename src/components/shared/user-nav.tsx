import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLoading } from '@/hooks/useLoading';
import { useLogout } from '@/hooks/useLogout';
import { useModal } from '@/hooks/useModal';
import { useToggleLogin } from '@/store/useToogleLogin';
import { AlertModal } from './alert-modal';

export default function UserNav() {
  const { toggleLogin } = useToggleLogin();
  const { logout } = useLogout();
  const { isOpen, setIsOpen } = useModal();
  const { isLoading, setIsLoading } = useLoading();
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          setIsLoading(true);
          logout();
          toggleLogin(false);
          localStorage.removeItem('ev_token');
          localStorage.removeItem('ev_userdetails');
          setIsLoading(false);
          setIsOpen(false);
        }}
        loading={isLoading}
        description={'You want to logout?'}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-14 w-14 rounded-full">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={
                  'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png'
                }
                alt={''}
              />
              <AvatarFallback>hello</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{'Admin'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {'admin@gmail.com'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
