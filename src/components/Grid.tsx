import React, { useEffect, useReducer, useState } from "react";
import { icons, numbers } from "../store/game-data";
import { GridProps, IconTileType, NumberTileType, PlayerDataCollectionType, TimerType } from "../types/types";
import "../sass/grid/grid.scss";
import { getCurrentPlayerId, initializePlayers, shuffle, updateTimer } from "../helper/helper-functions";
import { Set } from "typescript";

type Action = {
	type: string,
	player: keyof PlayerDataCollectionType,
	numberOfPlayers: number
};

const updatePlayerStats = (state: PlayerDataCollectionType, action: Action) => {
	if (action.type === "initialize") {
		return initializePlayers(action.numberOfPlayers);
	} else {
		return {...state, [action.player]: {
			...state[action.player],
			score: (state[action.player]?.score ?? Infinity) + 1
		}};
	}
}

function Grid(props: GridProps): JSX.Element {
	const {theme, players, gridSize, onGameCompletion} = props;
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
	const [playerData, setPlayerData] = useReducer(updatePlayerStats, {});
	const [currentPlayerNumber, setPlayerNumber] = useState(1);
	const [currentPlayerName, setPlayerName] = useState("Player 1");
	const [currentPlayerId, setPlayerId] = useState<keyof PlayerDataCollectionType>("playerOne");

	useEffect(() => {
		const iconTiles: IconTileType[] = [];
		const numberTiles: NumberTileType[] = [];

		if (theme === "icons") {
			for (const tile of icons) {
				iconTiles.push(tile, tile);
			}
			if (gridSize === 4) {
				iconTiles.splice(16);
			}
			setGridTiles(shuffle(iconTiles));
		} else {
			for (const tile of numbers) {
				numberTiles.push(tile, tile);
			}
			if (gridSize === 4) {
				numberTiles.splice(16);
			}
			setGridTiles(shuffle(numberTiles));
		}

		setGridColumns(gridSize);
	}, [theme, gridSize]);

	useEffect(() => {
		if (visibleTileOne.tile && visibleTileTwo.tile) {
			setNumberOfMoves((moves) => moves + 1);
			if (visibleTileOne.tile === visibleTileTwo.tile) {
				setFoundTiles((foundTiles) => foundTiles.add(visibleTileOne.tile));
				setVisibleTileOne({tile: "", index: -1});
				setVisibleTileTwo({tile: "", index: -1});
				setPlayerData({
					type: "update",
					player: currentPlayerId,
					numberOfPlayers: players
				});
			} else {
				setTimeout(() => {
					setVisibleTileOne({tile: "", index: -1});
					setVisibleTileTwo({tile: "", index: -1});
					setPlayerNumber((value) => {
						let updatedPlayerNumber = value + 1;
						if (updatedPlayerNumber > players) {
							updatedPlayerNumber = 1;
						}
						return updatedPlayerNumber;
					});
				}, 600);
			}
		}
	}, [visibleTileOne.tile, visibleTileTwo.tile, currentPlayerId, players]);

	useEffect(() => {
		setPlayerData({
			type: "initialize",
			player: "playerOne",
			numberOfPlayers: players
		});
	}, [players]);

	// Set current player
	useEffect(() => {
		const player = playerData[currentPlayerId];
		if (player?.name) {
			setPlayerName(player.name);
		}
	}, [currentPlayerId, playerData]);

	// Set current player id
	useEffect(() => {
		setPlayerId(getCurrentPlayerId(currentPlayerNumber));
	}, [currentPlayerId, currentPlayerNumber]);

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

	// Clear timer
	useEffect(() => {
		if (gameCompleted && timerId) {
			clearInterval(timerId);
		}
	}, [gameCompleted, timerId]);

	// Check game status
	useEffect(() => {		
		if (foundTiles.size === ((gridSize ** 2) / 2)) {
			setGameCompletion(true);
		}
	}, [foundTiles.size, gridSize]);

	useEffect(() => {
		if (gameCompleted) {
			onGameCompletion(gameCompleted, {
					movesNeeded: numberOfMoves,
					timeNeeded: timer,
					playerData: playerData
				}
			);
		}
	}, [onGameCompletion, gameCompleted, numberOfMoves, playerData, timer]);

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

			<h1>Moves needed - {numberOfMoves}</h1>
			<h1>Time needed - {timer.minutes}:{timer.seconds}</h1>
			{players > 1 && <h1>Current player - {currentPlayerName}</h1>}
			{players > 1 && <h1>Player 1: {playerData.playerOne?.score}</h1>}
			{players >= 2 && <h1>Player 2: {playerData.playerTwo?.score}</h1>}
			{players >= 3 && <h1>Player 3: {playerData.playerThree?.score}</h1>}
			{players === 4 && <h1>Player 4: {playerData.playerFour?.score}</h1>}
		</React.Fragment>
	);
}

export default Grid;
