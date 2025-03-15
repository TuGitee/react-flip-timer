interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeUnits = (timestamp: number): TimeUnits => {
  const totalSeconds = Math.floor(timestamp / 1000);
  return {
    days: Math.floor(totalSeconds / (24 * 3600)),
    hours: Math.floor((totalSeconds % (24 * 3600)) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
};

const padNumber = (value: number, length: number): string => {
  return value.toString().padStart(length, '0');
};

const formatWithDate = (timestamp: number, dateFormat: string): string => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const formatters = {
    '(y|Y)+': date.getFullYear(),
    '(M)+': date.getMonth() + 1,
    '(d|D)+': date.getDate(),
    '(h|H)+': date.getHours(),
    '(i|I|m)+': date.getMinutes(),
    '(s|S)+': date.getSeconds()
  };

  return Object.entries(formatters).reduce((result, [key, value]) => {
    const regex = new RegExp(key);
    return result.replace(regex, match => padNumber(value, match.length));
  }, dateFormat);
};

const formatWithCalculation = (timestamp: number, dateFormat: string): string => {
  const { days, hours, minutes, seconds } = calculateTimeUnits(timestamp);

  const formatters = {
    'd+': days,
    'h+': hours,
    '(m|i)+': minutes,
    's+': seconds
  };

  return Object.entries(formatters).reduce((result, [key, value]) => {
    const regex = new RegExp(`(${key})`, 'i');
    return result.replace(regex, match => padNumber(value, match.length));
  }, dateFormat);
};

export const formatTime = (timestamp: number, dateFormat: string = 'YYYY-MM-DD hh:ii:ss', mode: "date" | "calculation" = "date"): string => {
  return mode === "date"
    ? formatWithDate(timestamp, dateFormat)
    : formatWithCalculation(timestamp, dateFormat);
};