import { FlipClock } from "./";
import "./App.css";

const App = () => {
	return (
		<div className="app">
			<FlipClock
				continueAfterDeadline={true}
				formatter="YYYY/MM/dd|hh:mm:ss"
				separator="|"
				size="120"
				ratio={0.6}
				title={"当前时间"}
			/>
		</div>
	);
};

export default App;
