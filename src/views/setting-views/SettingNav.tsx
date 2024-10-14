import {
  SETTING_PREFIX_PATH
} from "@/config";
import clsx from "clsx";
import { FC, Fragment, memo, useCallback } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

type SidebarProps = {
  list?: {
    label: string;
    link: string;
  }[];
};

type NavItemType = {
  label: string;
  link: string;
  defaultExpanded?: boolean;
};

const SettingMenu = (props: NavItemType) => {
  const location = useLocation();

  const match = useMatch({
    path: location.pathname,
    end: true,
    caseSensitive: true,
  });

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
        'flex items-center justify-between transition-colors hover:bg-[#0003094d]',
        isActive(props.link) ? 'bg-[#0003094d]' : 'bg-transparent'
      )}
    >
      <Link
        to={props.link}
        className={clsx(
          'flex w-full items-center gap-1 p-3 text-sm font-medium',
          isActive(props.link) && 'font-semibold '
        )}
      >
        {/* <Icon className="text-gray-100" /> */}
        {props.label}
      </Link>
    </div>
  );

  return (
    <li key={props.link} className={`border-r dark:border-bgDark-600 border-gray-300 !m-0`}>
      {<Element />}
    </li>
  );
};

const NavItem = memo(SettingMenu);

const TopNavMenuComponent : FC<SidebarProps> = ({ list = sidebarItems }) => {
  return (
    <div className="link-wrapper">
      <ul className="flex space-x-5 bg-white dark:bg-bgDark-800 mt-5 rounded">
        {list?.map((item) => (
          <Fragment key={item.link}>
            <NavItem {...item} key={item.label} />
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export const SettingMenuNav = memo(TopNavMenuComponent);

const sidebarItems = [
  {
    label: 'Profile',
    link: `${SETTING_PREFIX_PATH}/profile`,
    // icon: DashboardIcon,
    children: [],
  },
  {
    label: 'Change Password',
    link: `${SETTING_PREFIX_PATH}/change-password`,
    // icon: DashboardIcon,
    children: [],
  },
];