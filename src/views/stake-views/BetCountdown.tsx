import useBetCountdown from '@/hooks/useBetCoundown';
import React from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const { timeLeft } = useBetCountdown(targetDate);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 rounded-box">
        <span className="countdown font-mono text-5xl">
          <span style={{ '--value': timeLeft.hours }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 rounded-box">
        <span className="countdown font-mono text-5xl">
          <span style={{ '--value': timeLeft.minutes }}></span>
        </span>
        minutes
      </div>
      <div className="flex flex-col p-2 rounded-box">
        <span className="countdown font-mono text-5xl">
          <span style={{ '--value': timeLeft.seconds }}></span>
        </span>
        seconds
      </div>
    </div>
  );
};

export default Countdown;
