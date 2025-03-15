import FlipCard from "./FlipCard";

interface DigitProps {
	char: string;
	isKey: boolean;
	currentValue?: string;
	nextValue?: string;
}

const Digit = ({ char, isKey, currentValue = "0", nextValue = "0" }: DigitProps) => {
	if (!isKey) {
		return <em>{char}</em>;
	}

	const isUp = Number(currentValue) < Number(nextValue);

	return (
		<FlipCard
			isUp={isUp}
			currentValue={currentValue}
			nextValue={nextValue}
		/>
	);
};

export default Digit;
