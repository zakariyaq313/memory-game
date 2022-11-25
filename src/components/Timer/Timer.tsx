import { useEffect, useState } from "react";
import { TimerType } from "../../types/types";
import { updateTimer } from "../../helper-functions/helper-functions";

type Props = {
	gameStarted: boolean,
	gamePaused: boolean,
	gameCompleted: boolean,
	onGameTimedOut: () => void,
	onSubmitTimeNeeded: (timeNeeded: TimerType) => void
};

function Timer(props: Props): JSX.Element {
	const {
		gameStarted,
		gamePaused,
		gameCompleted,
		onGameTimedOut,
		onSubmitTimeNeeded
	} = props;

	const [timer, setTimer] = useState<TimerType>({minutes: "0", seconds: "00"});
	const [timerId, setTimerId] = useState<NodeJS.Timer>();

	// Set and update timer
	useEffect(() => {
		let startTime = Date.now();
		if (gameStarted && !gameCompleted && !gamePaused) {
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
	}, [gameStarted, gamePaused, gameCompleted]);

	// When the game is paused
	useEffect(() => {
		if (gamePaused) {
			clearInterval(timerId);
		}
	}, [gamePaused, timerId]);

	// When the game is completed
	useEffect(() => {
		if (gameCompleted && timerId) {
			clearInterval(timerId);
			setTimerId(undefined);
			onSubmitTimeNeeded(timer);
		}
	}, [gameCompleted, timerId, timer, onSubmitTimeNeeded]);

	// When the game has timed out (10 mins)
	useEffect(() => {
		if (Number(timer.minutes) === 10) {
			onGameTimedOut();
		}
	}, [timer.minutes, onGameTimedOut]);

	return (
		<div className="info-bar stat-bar">
			<h3 className="bar-label">Time</h3>
			<h2 className="bar-value">{timer.minutes}:{timer.seconds}</h2>
		</div>
	);
}

export default Timer;
