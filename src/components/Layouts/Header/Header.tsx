import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Layouts";

export const Header = () => {

  const [isSticky, setIsSticky] = useState(false);

  const handleNavToggle = () => {
    const nav = document.getElementById("con-nav");
    if(nav?.classList?.contains('hidden')){
      nav?.classList?.remove('hidden');
    }else{
      nav?.classList?.add('hidden');
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 150;
      setIsSticky(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header 
        className={`
          transition-all lg:px-10 lg:py-3 bg-black duration-500 ease-in-out shadow-md text-sm flex lg:items-center lg:justify-between flex-col justify-start lg:flex-row
          ${isSticky ? 'sticky top-0' : ''}
        `}
        >
        <div className="flex items-center justify-between">
          <Logo size="sm"/>
          <div className="bar-wrapper lg:hidden cursor-pointer dark:text-white text-black" onClick={handleNavToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
          </div>
        </div>


        <nav className="nav-wrapper mt-5 lg:mt-0 hidden lg:block transform transition ease-out duration-300" id="con-nav">
          <div className="link-wrapper">
            <ul className="flex items-center gap-8 flex-col lg:flex-row text-base text-white">
              <li>
                <Link 
                  to="/" aria-current="page" 
                  className="font-medium tracking-wider">
                    Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}