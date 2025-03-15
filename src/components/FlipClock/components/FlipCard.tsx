import { memo } from 'react';

interface FlipCardProps {
	currentValue: string;
	nextValue: string;
	isUp: boolean;
}

const FlipCard = memo(({ currentValue, nextValue, isUp }: FlipCardProps) => {
	return (
		<div className={`flip ${isUp ? 'up' : 'down'}`}>
			<div className={`digital front number${currentValue ?? "0"}`} />
			<div className={`digital back number${nextValue ?? "0"}`} />
		</div>
	);
});

export default FlipCard;
