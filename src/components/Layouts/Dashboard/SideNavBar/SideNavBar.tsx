import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSwimmingPool, faCoins, faHandHoldingUsd, faExchangeAlt, faCogs, faSignOutAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, memo, ReactNode, useCallback, useMemo, useState } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { Logo } from '@/components/Layouts';
import { Switch } from '@/components/Form';
import { useColorMode, useModal } from '@/hooks';
import { DASHBOARD_PREFIX_PATH, DEPOSIT_PREFIX_PATH, POOL_PREFIX_PATH, SETTING_PREFIX_PATH, STAKE_PREFIX_PATH, TRANSACTION_PREFIX_PATH, WITHDRAW_PREFIX_PATH } from '@/config';
import { ConfirmDialog } from '@/components/Elements/Modal/confirmation';
import { useAuth } from '@/libs/auth';

type NavItemType = {
  label: string;
  link: string;
  icon?: any;
  defaultExpanded?: boolean;
  action?: boolean;
  children: { label: string; link: string }[];
};

const NavItemComponent = (props: NavItemType) => {
  const location = useLocation();
  const match = useMatch({ path: location.pathname, end: true, caseSensitive: true });
  const [expanded, setExpanded] = useState(props.defaultExpanded || false);
  const Icon = props.icon;
  const hasChildren = useMemo(() => props.children.length > 0, [props.children.length]);
  const [logoutModal, showLogoutModal] = useModal();
  
  const {
    actions: { logout },
  } = useAuth();
  const isActive = useCallback(
    (link: string) => {
      if (link.slice(1, 2) === '') {
        return match?.pathnameBase === link;
      }
      return match?.pathnameBase.startsWith(link);
    },
    [match?.pathnameBase]
  );

  const handleAction = () => {
    if (props.label === 'Logout') {
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
    }
  };

  const Element = () => (
    <div
      className={clsx(
        'flex items-center justify-between rounded-md transition-colors hover:bg-[#0003094d]',
        isActive(props.link) ? 'bg-[#0003094d]' : 'bg-transparent'
      )}
    >
      {props.action ? (
        <button
          onClick={handleAction}
          className="flex w-full items-center gap-1 p-3 text-sm font-medium"
        >
          {Icon && <FontAwesomeIcon icon={Icon} className="text-gray-100 mr-2" />}
          {props.label}
        </button>
      ) : (
        <Link
          to={props.link}
          className={clsx(
            'flex w-full items-center gap-1 p-3 text-sm font-medium',
            isActive(props.link) && 'font-semibold text-white'
          )}
        >
          {Icon && <FontAwesomeIcon icon={Icon} className="text-gray-100 mr-2" />}
          {props.label}
        </Link>
      )}
      {hasChildren && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex h-10 w-12 items-center justify-center p-1 outline-none"
        >
          {/* Add arrow icon here if needed */}
        </button>
      )}
    </div>
  );

  return (
    <li key={props.link} className={clsx('rounded-md', expanded && 'bg-[#0003094d]')}>
      {<Element />}

      {hasChildren && (
        <Transition
          show={expanded}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 translate-y-0 scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100"
          leaveTo="opacity-0 scale-50"
          role="menu"
          className={clsx('space-y-2 px-8 pb-4')}
          aria-label={props.label}
        >
          {props.children.map((x) => (
            <Link
              key={props.link + x.label}
              to={x.link}
              role="menuitem"
              className={clsx(
                'flex items-center gap-2 rounded-md p-2 text-sm text-gray-100 transition-colors duration-200 hover:font-semibold hover:text-white',
                isActive(x.link) && 'font-semibold text-white'
              )}
            >
              {isActive(x.link) && <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />}
              {x.label}
            </Link>
          ))}
        </Transition>
      )}
      {logoutModal}
    </li>
  );
};

const NavItem = memo(NavItemComponent);

type SidebarProps = {
  list?: {
    label: string;
    link: string;
    icon: ReactNode;
    children: {
      label: string;
      link: string;
    }[];
  }[];
};

const SideNavBarComponent: FC<SidebarProps> = ({ list = sidebarItems }) => {
  const { color, setColor } = useColorMode();

  return (
    <aside className="h-full w-1/5 min-w-[276px] max-w-xs bg-bgDark-900 dark:bg-bgDark-800 text-gray-200 shadow-sm ">
      <div className="flex h-full flex-col px-2 py-3">

        <div className='mx-auto mt-5'>
          <Logo size='md'/>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-hidden hover:overflow-y-auto">
          <ul className="space-y-2 px-3 py-4 mt-3">
            {list?.map((item) => (
              <NavItem {...item} key={item.label} />
            ))}
          </ul>
        </nav>

        <div className="flex-shrink-0 space-y-2 px-2 py-4">
          <div className="flex w-full items-center justify-center gap-4 text-sm font-semibold">
            <span className="flex items-center gap-1 text-gray-300">
              <FontAwesomeIcon icon={faMoon} />
              Dark
            </span>
            <Switch
              checked={color === 'light'}
              onChange={(e) => setColor(e.target.checked ? 'light' : 'dark')}
            />
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faSun} />
              Light
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
export const SideNavBar = memo(SideNavBarComponent);

const sidebarItems = [
  {
    label: 'Dashboard',
    link: DASHBOARD_PREFIX_PATH,
    icon: faTachometerAlt,
    children: [],
  },
  {
    label: 'Pools',
    link: POOL_PREFIX_PATH,
    icon: faSwimmingPool,
    children: [],
  },
  {
    label: 'My Stakes',
    link: `${STAKE_PREFIX_PATH}`,
    icon: faCoins,
    children: [],
  },
  {
    label: 'Deposit',
    link: DEPOSIT_PREFIX_PATH,
    icon: faHandHoldingUsd,
    children: [],
  },
  {
    label: 'Withdraw',
    link: WITHDRAW_PREFIX_PATH,
    icon: faHandHoldingUsd,
    children: [],
  },
  {
    label: 'Transactions',
    link: TRANSACTION_PREFIX_PATH,
    icon: faExchangeAlt,
    children: [],
  },
  {
    label: 'Settings',
    link: SETTING_PREFIX_PATH,
    icon: faCogs,
    children: [],
  },
  {
    label: 'Logout',
    link: '', // No link since this will trigger an action
    icon: faSignOutAlt,
    children: [],
    action: true, // Indicate that this item has an action
  },
];
