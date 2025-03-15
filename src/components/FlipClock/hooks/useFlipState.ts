import { useState, useCallback, useEffect } from 'react';
import { formatTime } from '../../../utils/time';

interface FlipState {
  now: string;
  next: string;
}

export const useFlipState = (
  time: number,
  showFormatter: string,
  restTime: number,
  clockBoxRef: React.RefObject<HTMLDivElement | null>,
  deadline?: string | Date,
  continueAfterDeadline = false,
) => {
  const getTimeStr = useCallback(() => {
    const mode = deadline ? "calculation" : "date";
    const formatTimeWithEscape = (timestamp: number, format: string) => {
      const parts = format.split(/\\./g);
      const escapes = format.match(/\\./g) || [];
      const timeStr = formatTime(timestamp, parts[0], mode);
      return parts.reduce((result, part, index) => {
        if (index === 0) return result;
        const escape = escapes[index - 1].charAt(1);
        const partTime = part ? formatTime(timestamp, part) : '';
        return result + escape + partTime;
      }, timeStr);
    };
    const now = formatTimeWithEscape(time, showFormatter);
    if (deadline && !continueAfterDeadline && restTime <= 0) {
      return { now, next: now };
    }
    const nextTime = deadline && continueAfterDeadline && restTime <= 0 ? time - 1000 : time + 1000;
    const next = formatTimeWithEscape(nextTime, showFormatter);
    if (deadline) {
      return { now: next, next: now };
    }
    return { now, next };
  }, [time, showFormatter, continueAfterDeadline, restTime, deadline]);

  const [preTimeStr, setPreTimeStr] = useState<FlipState>(getTimeStr());

  useEffect(() => {
    const timeStr = getTimeStr();
    const contents = clockBoxRef.current?.querySelectorAll(".contents") as NodeListOf<HTMLDivElement>;

    contents.forEach((content, i) => {
      if (timeStr.now[i] === timeStr.next[i]) return;
      const flip = content.querySelector(".flip");
      if (!flip) return;
      requestAnimationFrame(() => {
        flip.classList.remove("go");
        requestAnimationFrame(() => {
          flip.classList.add("go");
        });
      });
    });

    setPreTimeStr(timeStr);
  }, [time, getTimeStr, clockBoxRef]);

  return preTimeStr;
}; 