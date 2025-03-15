import { useMemo } from 'react';
import { SizeType, ThemeType } from '../types';

const SIZE_MAP: Record<string, string> = {
  large: "150px",
  middle: "80px",
  small: "50px"
};

const THEME_COLORS: Record<string, { bg: string; font: string }> = {
  dark: { bg: '#333', font: '#fff' },
  light: { bg: '#efefef', font: '#333' }
};

const processSizeValue = (size: string): string => {
  if (/^\d+$/.test(size)) {
    return `${size}px`;
  }
  if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(size)) {
    return size;
  }
  if (size in SIZE_MAP) {
    return SIZE_MAP[size];
  }
  return SIZE_MAP.middle;
};

export const useClockStyle = (size: SizeType, ratio: number, theme: ThemeType) => {
  if (ratio < 0.6) {
    console.warn("ratio must be greater than 0.6");
  }
  const sizeValue = processSizeValue(size);

  return useMemo(() => {
    const style: React.CSSProperties & { [key: string]: string } = {
      "--size": sizeValue,
      "--ratio": ratio.toString()
    };

    if (theme !== 'auto' && THEME_COLORS[theme]) {
      const colors = THEME_COLORS[theme];
      style['--bg'] = colors.bg;
      style['--font'] = colors.font;
    }

    return style;
  }, [sizeValue, ratio, theme]);
}; 