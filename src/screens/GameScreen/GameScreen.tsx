import { useEffect, useReducer, useState } from "react";
import Timer from "../../components/Timer/Timer";
import GameResults from "../../components/GameResults/GameResults";
import TilesGrid from "../../components/TilesGrid/TilesGrid";
import PausedMenu from "../../components/PausedMenu/PausedMenu";
import MultiPlayerStats from "../../components/MultiplayerStats/MultiplayerStats";
import { initializePlayerStats } from "../../helper-functions/helper-functions";
import { PlayerDataCollectionType, TimerType, GameResultType, GameModeType } from "../../types/types";
import "./GameScreen.scss";
import "../../sass/components/components.scss";

type State = GameResultType;
type Action = {
	type: String,
	movesNeeded?: number,
	timeNeeded?: TimerType,
	playerStats?: PlayerDataCollectionType,
	highScore?: number,
	numberOfPlayers?: number
};

function gameResultReducer(state: State, action: Action) {
	if (action.type === "movesNeeded" && action.movesNeeded) {
		return {...state,
			movesNeeded: action.movesNeeded
		};
	} else if (action.type === "timeNeeded" && action.timeNeeded) {
		return {...state,
			timeNeeded: action.timeNeeded
		};
	} else if (action.type === "initializePlayerStats" && action.numberOfPlayers) {
		return {...state,
			playerStats: initializePlayerStats(action.numberOfPlayers)
		};
	} else if (action.type === "playerStats" && action.playerStats && action.highScore) {
		return {...state,
			playerStats: action.playerStats,
			highScore: action.highScore
		};
	} else {
		return {...state};
	}
};

type Props = GameModeType & {
	onStartNewGame: () => void,
};

function GameScreen(props: Props): JSX.Element {
	const {gameTheme, numberOfPlayers, gridSize, onStartNewGame} = props;

	const [gridKey, setGridKey] = useState<string>(`grid-key-${Date.now()}`);
	const [timerKey, setTimerKey] = useState<string>(`timer-key-${Date.now()}`);
	const [resultsKey, setResultsKey] = useState<string>(`results-key-${Date.now()}`);
	const [playerStatsKey, setPlayerStatsKey] = useState<string>(`player-stats-key-${Date.now()}`);

	const [gameStarted, setGameStarted] = useState(false);
	const [gamePaused, setGamePaused] = useState(false);
	const [gameCompleted, setGameCompleted] = useState(false);
	const [gameTimedOut, setGameTimedOut] = useState(false);

	const [currentPlayerNumber, setCurrentPlayer] = useState(1);
	const [successfulPlayerNumber, setSuccessfulPlayer] = useState({player: 0, time: 0});
	const [movesNeeded, setMovesNeeded] = useState(0);
	const [gameResult, setGameResult] = useReducer(gameResultReducer, {
		movesNeeded: 0,
		timeNeeded: {minutes: "0", seconds: "00"},
		playerStats: [],
		highScore: 0
	});

	useEffect(() => {
		if (numberOfPlayers > 1) {
			setGameResult({
				type: "initializePlayerStats",
				numberOfPlayers: numberOfPlayers
			})
		}
	}, [numberOfPlayers]);

	useEffect(() => {
		if (gameCompleted && (numberOfPlayers === 1)) {
			setGameResult({
				type: "movesNeeded",
				movesNeeded: movesNeeded
			})
		}
	}, [gameCompleted, numberOfPlayers, movesNeeded]);

	const startGame = () => {
		setGameStarted(true);
	}

	const pauseGame = () => {
		setGamePaused(true);
	}

	const resumeGame = () => {
		setGamePaused(false);
	}

	const newGame = () => {
		onStartNewGame();
	}

	const restartGame = () => {
		// Reset state values to initial
		setGameStarted(false);
		setGamePaused(false);
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

	const updateMovesNeeded = () => {
		setMovesNeeded((moves) => moves + 1);
	}

	const successfulGuess = (playerNumber: number) => {
		// The "time" property is added merely to trigger a re-render
		// in child component in case "player" is the same even after update
		setSuccessfulPlayer({player: playerNumber, time: Date.now()});
	}

	const finishGame = () => {
		setTimeout(() => {
			setGameCompleted(true);
		}, 600);
	}

	const gameHasTimedOut = () => {
		setTimeout(() => {
			setGameTimedOut(true);
			setGameCompleted(true);
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

	return (
		<main className="game-screen">
			<header className="header-section">
				<h1 className="app-title">Memory</h1>

				<div className="control-buttons">
					<button onClick={pauseGame} className="orange-button" disabled={gameCompleted}>Pause</button>
					<button onClick={newGame} className="gray-button">New Game</button>
				</div>
			</header>

			<section className="game-section">
				<TilesGrid key={gridKey}
					gameTheme={gameTheme}
					numberOfPlayers={numberOfPlayers}
					gridSize={gridSize}
					onGameStarted={startGame}
					onUpdateMovesNeeded={updateMovesNeeded}
					onUpdateCurrentPlayer={updateCurrentPlayer}
					onSuccessfulGuess={successfulGuess}
					onGameCompleted={finishGame}
				/>

				{numberOfPlayers === 1 && (
					<div className="game-stats">
						<Timer key={timerKey}
							gameStarted={gameStarted}
							gamePaused={gamePaused}
							gameCompleted={gameCompleted}
							onGameTimedOut={gameHasTimedOut}
							onSubmitTimeNeeded={submitTimeNeeded}
						/>

						<div className="info-bar stat-bar">
							<h3 className="bar-label">Moves</h3>
							<h2 className="bar-value">{movesNeeded}</h2>
						</div>
					</div>
				)}

				{numberOfPlayers > 1 && (
					<div className={`game-stats multiplayer-stats total-players-${numberOfPlayers}`}>
						<MultiPlayerStats key={playerStatsKey}
							numberOfPlayers={numberOfPlayers}
							currentPlayerNumber={currentPlayerNumber}
							successfulPlayer={successfulPlayerNumber}
							gameCompleted={gameCompleted}
							onSubmitPlayerStats={submitPlayerStats}
						/>
					</div>
				)}

				{gamePaused && !gameCompleted && (
					<PausedMenu onResumeGame={resumeGame}
						onRestartGame={restartGame}
						onStartNewGame={newGame}
					/>
				)}

				{gameCompleted && (
					<GameResults key={resultsKey}
						numberOfPlayers={numberOfPlayers}
						gameTimedOut={gameTimedOut}
						movesNeeded={gameResult.movesNeeded}
						timeNeeded={gameResult.timeNeeded}
						playerStats={gameResult.playerStats}
						highScore={gameResult.highScore}
						onRestartGame={restartGame}
						onStartNewGame={newGame}
					/>
				)}
			</section>

			<p className="credit">Created by
				<a href="https://zakariyaq313.github.io/my-website/" target="_blank" rel="noreferrer">
					Muhammad Zakariya
				</a>
			</p>
		</main>
	);
}

export default GameScreen;
