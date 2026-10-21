import { useEffect, useRef, useState, type JSX } from "react";
import type { TimerType } from "../../types/types";
import { formatTime } from "../../helper-functions/helper-functions";

type Props = {
	gameStarted: boolean,
	gamePaused: boolean,
	gameCompleted: boolean,
	onGameTimedOut: () => void,
	onSubmitTimeNeeded: (timeNeeded: TimerType) => void
};

const TIME_LIMIT_MS = 10 * 60 * 1000;

function Timer(props: Props): JSX.Element {
	const {
		gameStarted,
		gamePaused,
		gameCompleted,
		onGameTimedOut,
		onSubmitTimeNeeded
	} = props;

	const [elapsedMs, setElapsedMs] = useState(0);
	const savedMs = useRef(0);
	const timeSubmitted = useRef(false);
	const timedOut = useRef(false);

	const isRunning = gameStarted && !gamePaused && !gameCompleted;

	// Set and update timer
	useEffect(() => {
		if (!isRunning) {
			return;
		}

		const runningSince = Date.now();
		const timerInterval = setInterval(() => {
			setElapsedMs(savedMs.current + (Date.now() - runningSince));
		}, 250);

		return () => {
			clearInterval(timerInterval);
			savedMs.current += Date.now() - runningSince;
			setElapsedMs(savedMs.current);
		};
	}, [isRunning]);

	// When the game is completed
	useEffect(() => {
		if (gameCompleted && !timeSubmitted.current) {
			timeSubmitted.current = true;
			onSubmitTimeNeeded(formatTime(savedMs.current));
		}
	}, [gameCompleted, onSubmitTimeNeeded]);

	// When the game has timed out (10 mins)
	useEffect(() => {
		if (elapsedMs >= TIME_LIMIT_MS && !timedOut.current) {
			timedOut.current = true;
			onGameTimedOut();
		}
	}, [elapsedMs, onGameTimedOut]);

	const timer = formatTime(elapsedMs);

	return (
		<div className="info-bar stat-bar">
			<h3 className="bar-label">Time</h3>
			<h2 className="bar-value">{timer.minutes}:{timer.seconds}</h2>
		</div>
	);
}

export default Timer;
