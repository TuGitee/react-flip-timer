import { useMemo } from 'react';

export const useClockTime = (
  deadline: string | Date | undefined,
  currentTime: number,
  continueAfterDeadline: boolean
) => {
  const restTime = useMemo(() => {
    if (!deadline) return 0;
    const deadlineTime = typeof deadline === 'string' ? new Date(deadline).getTime() : deadline.getTime();
    return deadlineTime < currentTime && !continueAfterDeadline ? 0 : deadlineTime - currentTime;
  }, [deadline, currentTime, continueAfterDeadline]);

  const time = useMemo(() => {
    if (!deadline) return currentTime;
    return restTime < 0 && !continueAfterDeadline ? 0 : Math.abs(restTime);
  }, [deadline, restTime, currentTime, continueAfterDeadline]);

  return { time, restTime };
}; 