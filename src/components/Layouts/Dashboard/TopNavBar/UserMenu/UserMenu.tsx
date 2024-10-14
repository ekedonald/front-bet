import { Menu } from '@headlessui/react';
import { FC, useMemo } from 'react';
import { Button, Avatar, DropDown } from '@/components/Elements';
import { ConfirmDialog } from '@/components/Elements/Modal/confirmation';
import { useModal } from '@/hooks';
import { useAuth } from '@/libs/auth';
import { SETTING_PREFIX_PATH } from '@/config';

export const UserMenu: FC = () => {
  const {
    actions: { logout },
  } = useAuth();
  const [logoutModal, showLogoutModal] = useModal();

  const actions = useMemo(
    () => [
      {
        title: 'Settings',
        link: `${SETTING_PREFIX_PATH}`,
      },
      {
        title: 'Logout',
        action: () => {
          showLogoutModal({
            title: 'Logout',
            showModal: (onClose) => (
              <ConfirmDialog
                title="Log out"
                description="Are you sure you want to logout?"
                onCancel={onClose}
                onSuccess={logout}
              />
            ),
            options: {
              position: 'top',
              className: '!py-4',
            },
          });
        },
      },
    ],
    [logout, showLogoutModal]
  );

  const { user } = useAuth();
  return (
    <>
      <DropDown
        trigger={() => (
          <div className="inline-flex w-full items-center justify-center gap-2 rounded-mdp-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-bgDark-700 focus-visible:ring-opacity-75">
            <Avatar
              variant="rounded"
              size='sm'
              name={`${user?.first_name} ${user?.last_name}`}
              src={user?.avatar}
            />

            <div className="mr-4 text-left text-sm">
              <p className="font-semibold capitalize">{`${user?.first_name} ${user?.last_name}`}</p>
              <span className="text-xs uppercase">
                {`${user?.email}`}
              </span>
            </div>
          </div>
        )}
      >
        {actions.map((x) => (
          <Menu.Item key={x.title}>
            {x.link ? (
              <Button.Link
                variant="text"
                size="sm"
                className="!focus:ring-0 text-bgDark-700 dark:text-white inline-block w-full !justify-start !p-2 text-left"
                to={x.link}
              >
                {x.title}
              </Button.Link>
            ) : (
              <Button
                variant="text"
                size="sm"
                className="inline-block w-full text-bgDark-700 dark:text-white !justify-start border-none !p-2 text-left"
                onClick={x.action}
              >
                {x.title}
              </Button>
            )}
          </Menu.Item>
        ))}
      </DropDown>
      {logoutModal}
    </>
  );
};
