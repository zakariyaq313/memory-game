import React, { useEffect, useReducer, useState } from "react";
import Grid from "../components/Grid";
import Results from "../components/Results";
import { GameScreenProps, ResultType } from "../types/types";

type Action = {
	type: String,
	results: ResultType
};

const gameResultReducer = (state: ResultType, action: Action) => {
	if (action.type === "singlePlayer") {
		return {...state,
			movesNeeded: action.results.movesNeeded,
			timeNeeded: action.results.timeNeeded
		}
	} else {
		return {...state,
			playerData: action.results.playerData
		};
	}
};

function GameScreen(props: GameScreenProps): JSX.Element {
	const [players, setPlayers] = useState(1);
	const [gridSize, setGridSize] = useState(4);
	const [gameOver, setGameOver] = useState(false);
	const [gridKey, setGridKey] = useState<string>(Date.now().toString());
	const [gameResult, setGameResult] = useReducer(gameResultReducer, {
		movesNeeded: 0,
		timeNeeded: { minutes: "00", seconds: "00" },
		playerData: {}
	});

	useEffect(() => {
		switch (props.players) {
			case "one":
				setPlayers(1);
				break;
			case "two":
				setPlayers(2);
				break;
			case "three":
				setPlayers(3);
				break;
			case "four":
				setPlayers(4);
				break;
		}
	}, [props.players]);

	useEffect(() => {
		if (props.gridSize === "fourTiles") {
			setGridSize(4);
		} else {
			setGridSize(6);
		}
	}, [props.gridSize]);

	const startNewGame = () => {
		props.onStartNewGame("start-up");
	}

	const restartGame = () => {
		setGridKey(Date.now().toString());
	}

	const gameIsComplete = (value: boolean, results: ResultType) => {
		setGameOver(value);
		setGameResult({
			type: players === 1 ? "singlePlayer" : "multiPlayer",
			results: results
		}); 
	}

	return (
		<React.Fragment>
			<header>
				<h1>Memory</h1>

				<button onClick={restartGame}>Restart</button>
				<button onClick={startNewGame}>New Game</button>
			</header>
			<main>
				<Grid key={gridKey}
					theme={props.theme}
					players={players}
					gridSize={gridSize}
					onGameCompletion={gameIsComplete}
				/>

				{gameOver &&
					<Results numberOfPlayers={players}
						movesNeeded={gameResult.movesNeeded}
						timeNeeded={gameResult.timeNeeded}
						playerData={gameResult.playerData}
					/>
				}
			</main>
		</React.Fragment>
	);
}

export default GameScreen;
