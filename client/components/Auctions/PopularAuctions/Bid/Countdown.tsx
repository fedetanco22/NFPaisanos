import React, { useState, useEffect } from 'react';

import styles from './Bid.module.css';

import { DM_SansFont } from '@/client/utils/fonts'


interface CountdownProps {
  targetTime: string; // Formatted target time from the parent component
}

interface RemainingTime {
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetTime }) => {
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateRemainingTime = (): RemainingTime => {
    const currentTime = new Date().getTime();
    const difference = new Date(targetTime).getTime() - currentTime;

    if (difference <= 0) {
      // Countdown is finished
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate remaining time
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  return (
    <div className={styles.countdownWrapper}>
      <div className={styles.countdownTime}>
        <span className={`${DM_SansFont.className} ${styles.countdownTimeNumber}`}>{remainingTime.hours}</span>
        <p>Hrs</p>
      </div>
      <div className={styles.countdownTime}>
        <span className={`${DM_SansFont.className} ${styles.countdownTimeNumber}`}>{remainingTime.minutes}</span>
        <p>mins</p>
      </div>
      <div className={styles.countdownTime}>
        <span className={`${DM_SansFont.className} ${styles.countdownTimeNumber}`}>{remainingTime.seconds}</span>
        <p>secs</p>
      </div>

    </div>
  );
};

export default Countdown;
