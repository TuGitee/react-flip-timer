export type ThemeType = "auto" | "dark" | "light";
export type SizeType = "large" | "middle" | "small" | string;
export type TitleType = string | ((currentTime: number, restTime: number) => string);

export interface FlipClockProps {
  formatter?: string;
  size?: SizeType;
  theme?: ThemeType;
  deadline?: string | Date;
  onDeadline?: (rest: number) => void;
  onTimeChange?: (currentTime: number, restTime: number) => void;
  continueAfterDeadline?: boolean;
  separator?: string;
  ratio?: number;
  title?: TitleType;
} 