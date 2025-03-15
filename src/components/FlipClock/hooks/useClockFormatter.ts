import { useMemo, useCallback } from 'react';

export const useClockFormatter = (
  deadline: string | Date | undefined,
  formatter: string | undefined,
  restTime: number,
  separator?: string
) => {
  if (separator && /[\\ymdhis]/i.test(separator)) {
    throw new Error(`separator cannot be '${separator}'`);
  }

  const isKey = useCallback((str: string) => (
    /\d/.test(str)
  ), [deadline]);

  const autoFormatter = useMemo(() => {
    if (!deadline || formatter) return formatter ?? "hh:mm:ss";

    const totalSeconds = Math.floor(Math.abs(restTime) / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const dayCount = Math.max(2, days.toString().length);

    return `${"d".repeat(dayCount)} ${"h".repeat(2)}:${"m".repeat(2)}:${"s".repeat(2)}`;
  }, [deadline, restTime, formatter]);

  const showFormatter = useMemo(() => {
    if (!deadline) return autoFormatter;

    return autoFormatter
      .split("")
      .map(char => {
        if ("dDhHmMsS".includes(char)) return char;
        if ("YyM".includes(char)) return "0";
        return char;
      })
      .join("");
  }, [autoFormatter, deadline]);

  const formatterLines = useMemo(() => (
    separator ? showFormatter.replace(/\\/g, "").split(separator) : [showFormatter.replace(/\\/g, "")]
  ), [showFormatter, separator]);

  return { isKey, showFormatter, formatterLines };
}; 