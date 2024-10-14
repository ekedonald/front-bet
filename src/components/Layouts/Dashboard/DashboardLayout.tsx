import { Transition } from '@headlessui/react';
import { ReactNode, FC, useRef, useEffect, Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Head } from '@/components/Head';
import { useDashboardState } from '@/stores/dashboard';
import { SideNavBar, TopNavBar } from '.';

type LayoutProps = {
  children?: ReactNode;
};

export const DashboardLayout: FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { notificationMessage } = useDashboardState();
  const location = useLocation();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return (
    <>
      <Head />
      <Transition
        show={!!notificationMessage}
        appear={true}
        enter="transform ease-out duration-300 transition"
        enterFrom="-translate-y-10 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 -translate-y-2"
        leaveTo="opacity-0 -translate-y-10"
        as={Fragment}
      >
        <div className="fixed left-0 z-30 w-full bg-blue-600 bg-opacity-80 px-2 py-3 shadow-sm backdrop-blur-sm dark:bg-blue-100 dark:bg-opacity-80">
          {notificationMessage}
        </div>
      </Transition>
      <div
        ref={scrollRef}
        className="relative flex h-screen overflow-hidden scroll-smooth bg-light antialiased transition-colors duration-300"
      >
        <div className={`sticky top-0 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <SideNavBar />
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <div className="dark:bg-bgDark-800 dark:border-bgDark-800 bg-white border-white border-b px-4">
            <TopNavBar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          </div>
          <div
            className="relative dark:bg-bgDark-700 bg-slate-100 flex h-full max-h-[calc(100vh-132px)] flex-col overflow-auto bg-inherit
          lg:max-h-[calc(100vh-62px)]"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
