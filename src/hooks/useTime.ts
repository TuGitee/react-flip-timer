import { useState, useEffect } from 'react';

export const useTime = (updateInterval = 1000) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    let frameId: number;
    let lastUpdate = performance.now();

    const updateTime = (timestamp: number) => {
      const elapsed = timestamp - lastUpdate;
      
      if (elapsed >= updateInterval) {
        const delay = elapsed % updateInterval;
        const now = Date.now() - delay;
        setCurrentTime(now);
        lastUpdate = timestamp - delay;
      }

      frameId = requestAnimationFrame(updateTime);
    };

    frameId = requestAnimationFrame(updateTime);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [updateInterval]);

  return currentTime;
}; 