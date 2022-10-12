import React, { useEffect, useState } from "react";
import { updateTimer } from "../helper/helper-functions";
import { TimerProps, TimerType } from "../types/types";

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
		<React.Fragment>
			<h1>Time needed - {timer.minutes}:{timer.seconds}</h1>
		</React.Fragment>
	);
}

export default Timer;