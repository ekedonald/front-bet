import { Switch } from "@/components/Form";
import {
  DEPOSIT_PREFIX_PATH,
  MARKET_PREFIX_PATH,
  POOL_PREFIX_PATH,
  STAKE_PREFIX_PATH,
  SUPPORT_PREFIX_PATH,
  TRANSACTION_PREFIX_PATH,
  WITHDRAW_PREFIX_PATH
} from "@/config";
import { useColorMode } from "@/hooks";
import clsx from "clsx";
import { FC, ReactNode, memo, useCallback, useMemo, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

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

type NavItemType = {
  label: string;
  link: string;
  icon?: any;
  defaultExpanded?: boolean;
  children: { label: string; link: string }[];
};

const NavItemComponent = (props: NavItemType) => {
  const location = useLocation();

  const match = useMatch({
    path: location.pathname,
    end: true,
    caseSensitive: true,
  });

  const [expanded, setExpanded] = useState(props.defaultExpanded || false);
  const Icon = props.icon;
  const hasChildren = useMemo(() => props.children.length > 0, [props.children.length]);

  const isActive = useCallback(
    (link: string) => {
      if (link.slice(1, 2) === '') {
        return match?.pathnameBase === link;
      }
      return match?.pathnameBase.startsWith(link);
    },
    [match?.pathnameBase]
  );

  const Element = () => (
    <div
      className={clsx(
        'flex items-center justify-between rounded-md transition-colors hover:bg-[#0003094d]',
        isActive(props.link) ? 'bg-[#0003094d]' : 'bg-transparent'
      )}
    >
      <Link
        to={props.link}
        className={clsx(
          'flex w-full items-center gap-1 p-3 text-sm font-medium',
          isActive(props.link) && 'font-semibold text-white'
        )}
      >
        {/* <Icon className="text-gray-100" /> */}
        {props.label}
      </Link>
      {hasChildren && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex h-10 w-12 items-center justify-center p-1 outline-none"
        >
          {/* <ArrowIcon className={clsx(' transition-transform ', expanded ? 'rotate-180' : '')} /> */}
        </button>
      )}
    </div>
  );

  return (
    <li key={props.link} className={clsx('rounded-md mt-2', expanded && 'bg-bgDark-800')}>
      {<Element />}

      
    </li>
  );
};

const NavItem = memo(NavItemComponent);

const TopNavMenuComponent : FC<SidebarProps> = ({ list = sidebarItems }) => {
  const { color, setColor } = useColorMode();
  return (
    <div className="link-wrapper">
      <ul className="flex space-x-5">
        {list?.map((item) => (
          <NavItem {...item} key={item.label} />
        ))}
        <li>
          <div className="flex-shrink-0 space-y-2 px-2 py-4">
            <div className="flex w-full items-center justify-center gap-4 text-sm font-semibold">
              <span className="flex items-center gap-1 text-gray-300">
                {/* <MoonIcon /> */}
                Dark
              </span>
              <Switch
                checked={color === 'light'}
                onChange={(e) => setColor(e.target.checked ? 'light' : 'dark')}
              />
              <span className="flex items-center gap-1">
                {/* <SunIcon /> */}
                Light
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export const TopNavMenu = memo(TopNavMenuComponent);

const sidebarItems = [
  {
    label: 'Pools',
    link: POOL_PREFIX_PATH,
    // icon: DashboardIcon,
    children: [],
  },
  {
    label: 'Bet History',
    link: `${STAKE_PREFIX_PATH}/history`,
    // icon: DashboardIcon,
    children: [],
  },
  {
    label: 'Deposit',
    link: DEPOSIT_PREFIX_PATH,
    // icon: DashboardIcon,
    children: [],
  },
  {
    label: 'Withdraw',
    link: WITHDRAW_PREFIX_PATH,
    // icon: DashboardIcon,
    children: [],
  },
  {
    label: 'Transactions',
    link: TRANSACTION_PREFIX_PATH,
    // icon: DashboardIcon,
    children: []
  },
];