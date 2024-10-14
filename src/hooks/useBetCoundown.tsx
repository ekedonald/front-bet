import { usePoolActions } from '@/stores/pool';
import { useEffect, useState } from 'react';

const useBetCountdown = (targetDate: string) => {
  const { updateShouldReloadBetPage } = usePoolActions();
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: {
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasCountdownEnded, setHasCountdownEnded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (
        updatedTimeLeft.days === 0 &&
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0 &&
        !hasCountdownEnded
      ) {
        updateShouldReloadBetPage(true);
        setHasCountdownEnded(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, hasCountdownEnded, updateShouldReloadBetPage]);

  return { timeLeft };
};

export default useBetCountdown;
