import { useEffect, useState } from "react";
import { TimerProps, TimerType } from "../types/types";
import { updateTimer } from "../helper-functions/helper-functions";

function Timer(props: TimerProps): JSX.Element {
	const {gameStarted, gameCompleted, onSubmitTimeNeeded} = props;
	const [timer, setTimer] = useState<TimerType>({minutes: "00", seconds: "00"});
	const [timerId, setTimerId] = useState<NodeJS.Timer>();

	// Set timer
	useEffect(() => {
		let startTime = Date.now();

		if (gameStarted && !gameCompleted) {
			const timerInterval = setInterval(() => {
				setTimer((timer) => {
					const updatedValues = updateTimer(timer, startTime);
					if (updatedValues.startTime) {
						startTime = updatedValues.startTime;
					}
					return {
						minutes: updatedValues.minutes,
						seconds: updatedValues.seconds
					};
				});
			}, 1000);

			setTimerId(timerInterval);
		}
	}, [gameStarted, gameCompleted]);

	// Stop timer once game is over and submit the time needed
	useEffect(() => {
		if (gameCompleted && timerId) {
			clearInterval(timerId);
			setTimerId(undefined);
			onSubmitTimeNeeded(timer);
		}
	}, [gameCompleted, timerId, timer, onSubmitTimeNeeded]);

	return (
		<div className="info-bar stat-bar">
			<h3 className="bar-label">Time</h3>
			<h2 className="bar-value">{timer.minutes}:{timer.seconds}</h2>
		</div>
	);
}

export default Timer;
