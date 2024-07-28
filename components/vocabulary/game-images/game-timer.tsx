import { useEffect } from 'react';
import useGameStore from '@/store/game.provider';

const Timer = () => {
  const { time, setTime, setIsTimeUpDialogOpen, setTimerRunning, timerRunning } = useGameStore();

  useEffect(() => {
    if (timerRunning && time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    } else if (time === 0) {
      setIsTimeUpDialogOpen(true);
      setTimerRunning(false);
    }
  }, [timerRunning, time, setTime, setIsTimeUpDialogOpen, setTimerRunning]);

  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return <h3 className='text-xl text-primary font-sans mt-[52px] md:mt-2'>{formatTime(time)}</h3>;
};

export default Timer;
