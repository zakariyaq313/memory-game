import { useEffect, useReducer, useState } from "react";
import Grid from "../components/Grid";
import Results from "../components/Results";
import { GameScreenProps, PlayerDataCollectionType, ResultType, TimerType } from "../types/types";
import "../sass/game-screen/game-screen.scss";
import "../sass/game-stats/game-stats.scss";
import "../sass/components/components.scss";
import Timer from "../components/Timer";
import PlayerStats from "../components/PlayerStats";

type Action = {
	type: String,
	movesNeeded?: number,
	timeNeeded?: TimerType,
	playerStats?: PlayerDataCollectionType,
	highScore?: number
};

const gameResultReducer = (state: ResultType, action: Action) => {
	if (action.type === "movesNeeded" && action.movesNeeded) {
		return {...state,
			movesNeeded: action.movesNeeded
		};
	} else if(action.type === "timeNeeded" && action.timeNeeded) {
		return {...state,
			timeNeeded: action.timeNeeded
		};
	} else if(action.type === "playerStats" && action.playerStats && action.highScore) {
		return {...state,
			playerStats: action.playerStats,
			highScore: action.highScore
		};
	} else {
		return {...state};
	}
};

function GameScreen(props: GameScreenProps): JSX.Element {
	const {gameTheme, onStartNewGame} = props;
	const [numberOfPlayers, setNumberOfPlayers] = useState(1);
	const [gridSize, setGridSize] = useState(4);

	const [gridKey, setGridKey] = useState<string>(`grid-key-${Date.now()}`);
	const [timerKey, setTimerKey] = useState<string>(`timer-key-${Date.now()}`);
	const [playerStatsKey, setPlayerStatsKey] = useState<string>(`player-stats-key-${Date.now()}`);
	const [resultsKey, setResultsKey] = useState<string>(`results-key-${Date.now()}`);

	const [gameStarted, setGameStarted] = useState(false);
	const [gameCompleted, setGameCompleted] = useState(false);
	const [currentPlayerNumber, setCurrentPlayer] = useState(1);
	const [successfulPlayerNumber, setSuccessfulPlayer] = useState({player: 0, time: 0});
	const [movesNeeded, setMovesNeeded] = useState(0);
	const [gameResult, setGameResult] = useReducer(gameResultReducer, {
		movesNeeded: 0,
		timeNeeded: {minutes: "00", seconds: "00"},
		playerStats: [],
		highScore: 0
	});

	useEffect(() => {
		setNumberOfPlayers(Number(props.numberOfPlayers));
	}, [props.numberOfPlayers]);

	useEffect(() => {
		if (props.gridSize === "four") {
			setGridSize(4);
		} else {
			setGridSize(6);
		}
	}, [props.gridSize]);

	useEffect(() => {
		if (gameCompleted) {
			setGameResult({
				type: "movesNeeded",
				movesNeeded: movesNeeded
			})
		}
	}, [gameCompleted, movesNeeded]);

	const startGame = (value: boolean) => {
		setGameStarted(value);
	}

	const startNewGame = () => {
		onStartNewGame("start-up");
	}

	const restartGame = () => {
		setGameStarted(false);
		setGameCompleted(false);
		setMovesNeeded(0);
		setCurrentPlayer(1);
		setSuccessfulPlayer({player: 0, time: 0});

		// Change key prop to trigger a re-render of components
		setGridKey(`grid-key-${Date.now()}`);
		setTimerKey(`timer-key-${Date.now()}`);
		setPlayerStatsKey(`player-stats-key-${Date.now()}`);
		setResultsKey(`results-key-${Date.now()}`);
	}

	const updateCurrentPlayer = (playerNumber: number) => {
		setCurrentPlayer(playerNumber);
	}

	const successfulGuess = (playerNumber: number) => {
		// Time because useeffect in child component is not triggered if value (player) doesn't change
		setSuccessfulPlayer({player: playerNumber, time: Date.now()});
	}

	const gameIsComplete = (value: boolean) => {
		setTimeout(() => {
			setGameCompleted(value);
		}, 600);
	}

	const submitTimeNeeded = (timeNeeded: TimerType) => {
		setGameResult({
			type: "timeNeeded",
			timeNeeded: timeNeeded
		});
	}

	const submitPlayerStats = (playerStats: PlayerDataCollectionType, highScore: number) => {
		setGameResult({
			type: "playerStats",
			playerStats: playerStats,
			highScore: highScore
		});
	}

	const updateMovesNeeded = () => {
		setMovesNeeded((moves) => moves + 1);
	}

	return (
		<main className="in-game-screen">
			<header className="header-section">
				<h1>Memory</h1>

				<div className="control-buttons">
					<button onClick={restartGame} className="orange-button">Restart</button>
					<button onClick={startNewGame} className="gray-button">New Game</button>
				</div>
			</header>

			<section className="game-section">
				<Grid key={gridKey}
					gameTheme={gameTheme}
					numberOfPlayers={numberOfPlayers}
					gridSize={gridSize}
					onGameStarted={startGame}
					onUpdateMovesNeeded={updateMovesNeeded}
					onUpdateCurrentPlayer={updateCurrentPlayer}
					onSuccessfulGuess={successfulGuess}
					onGameCompletion={gameIsComplete}
				/>

				{numberOfPlayers === 1 && (
					<div className="game-stats">
						<Timer key={timerKey}
							gameStarted={gameStarted}
							gameCompleted={gameCompleted}
							onSubmitTimeNeeded={submitTimeNeeded}
						/>

						<div className="info-bar stat-bar">
							<h3 className="bar-label">Moves</h3>
							<h2 className="bar-value">{movesNeeded}</h2>
						</div>
					</div>
				)}

				{numberOfPlayers > 1 && (
					<div className="game-stats">
						<PlayerStats key={playerStatsKey}
							numberOfPlayers={numberOfPlayers}
							currentPlayerNumber={currentPlayerNumber}
							successfulPlayer={successfulPlayerNumber}
							gameCompleted={gameCompleted}
							onSubmitPlayerStats={submitPlayerStats}
						/>
					</div>
				)}

				{gameCompleted && (
					<Results key={resultsKey}
						numberOfPlayers={numberOfPlayers}
						movesNeeded={gameResult.movesNeeded}
						timeNeeded={gameResult.timeNeeded}
						playerStats={gameResult.playerStats}
						highScore={gameResult.highScore}
						onRestartGame={restartGame}
						onStartNewGame={startNewGame}
					/>
				)}
			</section>
		</main>
	);
}

export default GameScreen;
