import { useEffect, useRef, useMemo } from "react";
import { useTime } from "../../hooks/useTime";
import { classnames } from "../../utils/classnames";
import { FlipClockProps, TitleType } from "./types";
import { useClockTime } from "./hooks/useClockTime";
import { useClockFormatter } from "./hooks/useClockFormatter";
import { useClockStyle } from "./hooks/useClockStyle";
import { useFlipState } from "./hooks/useFlipState";
import FlipDigits from "./components/FlipDigits";
import "./styles.css";

const getTitle = (title: TitleType | undefined, currentTime: number, restTime: number): string => {
	if (!title) return "";
	return typeof title === "function" ? title(currentTime, restTime) : title;
};

const FlipClock = ({ formatter, size = "middle", theme = "auto", deadline, onDeadline, onTimeChange, continueAfterDeadline = false, separator, title, ratio = 0.66 }: FlipClockProps) => {
	const clockBoxRef = useRef<HTMLDivElement>(null);
	const currentTime = useTime();
	const clockStyle = useClockStyle(size, ratio, theme);
	const { time, restTime } = useClockTime(deadline, currentTime, continueAfterDeadline);
	const { isKey, showFormatter, formatterLines } = useClockFormatter(deadline, formatter, restTime, separator);
	const preTimeStr = useFlipState(time, showFormatter.replace(separator ?? "", ""), restTime, clockBoxRef, deadline, continueAfterDeadline);
	const displayTitle = useMemo(() => getTitle(title, currentTime, restTime), [title, currentTime, restTime]);

	useEffect(() => {
		if (restTime <= 0 && deadline && onDeadline) {
			onDeadline(restTime);
		}
	}, [restTime, onDeadline, deadline]);

	useEffect(() => {
		if (onTimeChange) {
			onTimeChange(currentTime, restTime);
		}
	}, [currentTime, restTime, onTimeChange]);

	const renderTitle = () => {
		if (!displayTitle) return null;
		return <div className="clock-title">{displayTitle}</div>;
	};

	const renderDigits = () => {
		return formatterLines.map((line, lineIndex) => (
			<FlipDigits
				key={lineIndex}
				line={line}
				lineIndex={lineIndex}
				preTimeStr={preTimeStr}
				offset={formatterLines.slice(0, lineIndex).join("").length}
				isKey={isKey}
			/>
		));
	};

	const isNearDeadline = Math.abs(restTime) <= 300 && !!deadline;

	return (
		<div
			ref={clockBoxRef}
			className="clock-box"
			style={clockStyle}
			data-theme={theme}
		>
			{renderTitle()}
			<div className={classnames("clock", { active: isNearDeadline })}>
				{renderDigits()}
			</div>
		</div>
	);
};

export default FlipClock;
