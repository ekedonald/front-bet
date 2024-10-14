import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserMenu } from './UserMenu';
import { UserBalance } from './UserBalance';
import { FC } from 'react';
import { Logo } from '../../Logo';

type TopNavBarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

export const TopNavBar: FC<TopNavBarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-20 h-fit min-h-[62px] w-full bg-inherit pt-1">
      <div className='flex items-center justify-between'>
        <div className="flex items-center justify-start">
          <button
            className="block lg:hidden p-2 text-gray-700 dark:text-gray-300"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          {
            !isSidebarOpen &&
            <div className='lg:hidden'>
              <Logo size='sm'/>
            </div>
          }
        </div>
        <div className="flex items-center justify-end gap-x-10">
          <UserBalance />
          <div className="hidden lg:block">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
