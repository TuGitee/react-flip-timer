import { classnames } from "../../../utils/classnames";
import Digit from "./Digit";

interface FlipDigitsProps {
	line: string;
	lineIndex: number;
	preTimeStr: { now: string; next: string };
  offset: number;
	isKey: (char: string) => boolean;
}

const FlipDigits = ({ line, lineIndex, preTimeStr, offset = 0, isKey }: FlipDigitsProps) => {
  const currentValue = preTimeStr.now.slice(offset)
  const nextValue = preTimeStr.next.slice(offset)
	return (
		<div className="clock-line">
			{line.split("").map((char, charIndex) => (
				<div
					key={`${lineIndex}-${charIndex}`}
					className={classnames("contents")}
				>
					<Digit
						char={char}
						isKey={isKey(currentValue[charIndex]) || isKey(nextValue[charIndex])}
						currentValue={currentValue[charIndex]}
						nextValue={nextValue[charIndex]}
					/>
				</div>
			))}
		</div>
	);
};

export default FlipDigits;
