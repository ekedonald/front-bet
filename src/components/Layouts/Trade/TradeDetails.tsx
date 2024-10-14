import { useState } from "react";
import CandlestickChart from "./chart";
import { PoolType } from "@/views/pool-views/types";

type TimeComponentProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;

};

interface TradeDetaileProps {
  pool: PoolType;
  defaultToken: string;
}

const TimeComponent: React.FC<TimeComponentProps> = ({ children, active, onClick }) => (
  <div
    className={`self-stretch my-auto px-3 py-1.5 ${
      active ? "text-white bg-gray-600" : ""
    } rounded-[100px] cursor-pointer`}
    onClick={onClick}
  >
    {children}
  </div>
);
export const TradeDetails: React.FC<TradeDetaileProps> = ({ pool, defaultToken }) => {

  const [activeTimeComponent, setActiveTimeComponent] = useState<string>("1m");

  return (
    <section className="flex flex-col font-medium rounded-lg border border-solid dark:bg-bgDark-700 dark:border-bgDark-500">
      <nav className="flex gap-5 justify-between p-4 w-full text-sm leading-4 text-gray-400 rounded-lg border border-solid dark:bg-bgDark-700 dark:border-bgDark-500 max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2 py-0.5 max-md:flex-wrap">
          <div className="flex flex-auto gap-5 justify-between items-center whitespace-nowrap">
            <TimeComponent active={activeTimeComponent === '1m'} onClick={() => setActiveTimeComponent('1m')}>1m</TimeComponent>
            <TimeComponent active={activeTimeComponent === '3m'} onClick={() => setActiveTimeComponent('3m')}>3m</TimeComponent>
            <TimeComponent active={activeTimeComponent === '5m'} onClick={() => setActiveTimeComponent('5m')}>5m</TimeComponent>
            <TimeComponent active={activeTimeComponent === '15m'} onClick={() => setActiveTimeComponent('15m')}>15m</TimeComponent>
            <TimeComponent active={activeTimeComponent === '30m'} onClick={() => setActiveTimeComponent('30m')}>30m</TimeComponent>
          </div>
        </div>
      </nav>
      <div className="w-full dark:bg-neutral-800 min-h-[1px] max-md:max-w-full" />
      <main className="text-xs leading-4 text-white min-h-[496px] mt-5">
        <CandlestickChart activeTimeComponent={activeTimeComponent} pool={pool} defaultToken={defaultToken}/>
      </main>
    </section>
  );
};