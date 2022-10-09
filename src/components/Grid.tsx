import React, { useEffect, useReducer, useState } from "react";
import { icons, numbers } from "../store/game-data";
import { GridProps, IconTileType, NumberTileType, PlayerDataCollectionType, TimerType } from "../types/types";
import "../sass/grid/grid.scss";
import { initializePlayers, shuffle, updateTimer } from "../helper/helper-functions";
import { Set } from "typescript";

type Action = {
	type: string,
	currentPlayer: number,
	numberOfPlayers: number
};

const updatePlayerStats = (state: PlayerDataCollectionType, action: Action) => {
	if (action.type === "initialize") {
		return initializePlayers(action.numberOfPlayers);
	} else {
		return state.map((playerData, index) => {
			if (action.currentPlayer === index) {
				return {...playerData, score: playerData.score + 1};
			}
			return playerData;
		});
	}
}

function Grid(props: GridProps): JSX.Element {
	const {gameTheme, numberOfPlayers, gridSize, onGameCompletion} = props;

	const [gridTiles, setGridTiles] = useState<IconTileType[] | NumberTileType[]>([]);
	const [gridColumns, setGridColumns] = useState(4);

	const [foundTiles, setFoundTiles] = useState<Set<string>>(new Set(""));
	const [visibleTileOne, setVisibleTileOne] = useState({tile: "", index: -1});
	const [visibleTileTwo, setVisibleTileTwo] = useState({tile: "", index: -1});

	const [numberOfMoves, setNumberOfMoves] = useState(0);
	const [timer, setTimer] = useState<TimerType>({minutes: "00", seconds: "00"});
	const [timerId, setTimerId] = useState<NodeJS.Timer>();

	const [gameStarted, setGameStart] = useState(false);
	const [gameCompleted, setGameCompletion] = useState(false);
	const [resultSubmitted, setResultSubmission] = useState(false);

	const [playerData, setPlayerData] = useReducer(updatePlayerStats, []);
	const [currentPlayerNumber, setPlayerNumber] = useState(1);
	const [currentPlayerName, setPlayerName] = useState("Player 1");

	// Create grid tiles
	useEffect(() => {
		const iconTiles: IconTileType[] = [];
		const numberTiles: NumberTileType[] = [];

		if (gameTheme === "icons") {
			for (const tile of icons) iconTiles.push(tile, tile);
			if (gridSize === 4) iconTiles.splice(16);
			setGridTiles(shuffle(iconTiles));
		} else {
			for (const tile of numbers) numberTiles.push(tile, tile);
			if (gridSize === 4) numberTiles.splice(16);
			setGridTiles(shuffle(numberTiles));
		}

		setGridColumns(gridSize);
	}, [gameTheme, gridSize]);

	useEffect(() => {
		if (visibleTileOne.tile && visibleTileTwo.tile) {
			if (numberOfPlayers === 1) {
				setNumberOfMoves((moves) => moves + 1);				
			}

			if (visibleTileOne.tile === visibleTileTwo.tile) {
				setFoundTiles((foundTiles) => foundTiles.add(visibleTileOne.tile));
				setVisibleTileOne({tile: "", index: -1});
				setVisibleTileTwo({tile: "", index: -1});

				if (numberOfPlayers > 1) {
					setPlayerData({
						type: "update",
						currentPlayer: currentPlayerNumber - 1,
						numberOfPlayers: numberOfPlayers
					});
				}
			} else {
				setTimeout(() => {
					setVisibleTileOne({tile: "", index: -1});
					setVisibleTileTwo({tile: "", index: -1});
					
					if (numberOfPlayers > 1) {
						setPlayerNumber((value) => {
							let updatedPlayerNumber = value + 1;
							if (updatedPlayerNumber > numberOfPlayers) {
								updatedPlayerNumber = 1;
							}
							return updatedPlayerNumber;
						});
					}
				}, 600);
			}
		}
	}, [visibleTileOne.tile, visibleTileTwo.tile, currentPlayerNumber, numberOfPlayers]);

	// Set initial data for players
	useEffect(() => {
		setPlayerData({
			type: "initialize",
			currentPlayer: 0,
			numberOfPlayers: numberOfPlayers
		});
	}, [numberOfPlayers]);

	// Set current player
	useEffect(() => {
		if (numberOfPlayers > 1) {
			const currentPlayer = playerData[currentPlayerNumber - 1];
			setPlayerName(currentPlayer.label);
		}
	}, [numberOfPlayers, currentPlayerNumber, playerData]);

	// Set timer
	useEffect(() => {
		if (numberOfPlayers === 1) {
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
		}
	}, [numberOfPlayers, gameStarted, gameCompleted]);

	// Stop timer once game is over
	useEffect(() => {
		if (gameCompleted && timerId) {
			clearInterval(timerId);
			setTimerId(undefined);
		}
	}, [gameCompleted, timerId]);

	// Send results once the game is over
	useEffect(() => {
		if (gameCompleted && !resultSubmitted) {
			onGameCompletion(gameCompleted, {
				movesNeeded: numberOfMoves,
				timeNeeded: timer,
				playerData: playerData
			});

			setResultSubmission(true);
		}
	}, [onGameCompletion, gameCompleted, resultSubmitted, numberOfMoves, timer, playerData]);

	// Check game status
	useEffect(() => {
		if (foundTiles.size === ((gridSize ** 2) / 2)) {
			setGameCompletion(true);
		}
	}, [foundTiles.size, gridSize]);

	const startGame = () => {
		setGameStart(true);
	}

	const revealTile = (tile: string, index: number) => {
		if (!foundTiles.has(tile)) {
			if (!visibleTileOne.tile) {
				setVisibleTileOne({tile: tile, index: index})
			} else if (!visibleTileTwo.tile && index !== visibleTileOne.index) {
				setVisibleTileTwo({tile: tile, index: index});
			}
		}
	}

	const tileIsVisibe = (tile: string, index: number) => {
		if (foundTiles.has(tile) || visibleTileOne.index === index || visibleTileTwo.index === index) {
			return true;
		}
		return false;
	}

	return (
		<React.Fragment>
			<div className="game-grid"
				style={{gridTemplateColumns: `repeat(${gridColumns}, auto)`}}
				onClick={!gameStarted ? startGame : undefined}>
				{gridTiles.map((tileData, index) => (
					<button key={index} onClick={() => revealTile(tileData.id, index)}>
						{tileIsVisibe(tileData.id, index) && tileData.tile}
					</button>
				))}
			</div>

			{numberOfPlayers === 1 &&
				<React.Fragment>
					<h1>Moves needed - {numberOfMoves}</h1>
					<h1>Time needed - {timer.minutes}:{timer.seconds}</h1>
				</React.Fragment>
			}

			{numberOfPlayers > 1 &&
				<React.Fragment>
					<h1>Current player - {currentPlayerName}</h1>
					{playerData.map((player, index) => (
						<h1 key={index}>{player.label}: {player.score}</h1>
					))}
				</React.Fragment>
			}
		</React.Fragment>
	);
}

export default Grid;
