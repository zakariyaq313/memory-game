import React, { useEffect, useReducer, useState } from "react";
import { icons, numbers } from "../store/game-data";
import { GridProps, IconType, NumberType, PlayerDataCollectionType, TimerType } from "../types/types";
import "../sass/grid/grid.scss";
import { getCurrentPlayer, initializePlayers, shuffle, updateTimer } from "../helper/helper-functions";
import { Set } from "typescript";

const updatePlayerStats = (state: PlayerDataCollectionType, action: string) => {
	const updatedState = {...state};
	const player = updatedState[action as keyof PlayerDataCollectionType];

	if (player) {
		updatedState[action as keyof PlayerDataCollectionType]!.score = player.score + 1;
	}

	return updatedState;
}

function Grid(props: GridProps): JSX.Element {
	const {theme, players, gridSize} = props;
	const playersInitialState = initializePlayers(players);
	const [gridTiles, setGridTiles] = useState<IconType[] | NumberType[]>([]);
	const [gridColumns, setGridColumns] = useState(4);
	const [foundTiles, setFoundTiles] = useState<Set<string>>(new Set(""));
	const [visibleTileOne, setVisibleTileOne] = useState({tile: "", index: -1});
	const [visibleTileTwo, setVisibleTileTwo] = useState({tile: "", index: -1});
	const [numberOfMoves, setNumberOfMoves] = useState(0);
	const [timer, setTimer] = useState<TimerType>({minutes: "00", seconds: "00"});
	const [gameStarted, setGameStarted] = useState(false);
	const [playerData, setPlayerData] = useReducer(updatePlayerStats, playersInitialState);
	const [currentPlayerId, setCurrentPlayerId] = useState(1);
	const [currentPlayerName, setCurrentPlayerName] = useState("Player 1");

	useEffect(() => {
		const iconTiles: IconType[] = [];
		const numberTiles: NumberType[] = [];

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
				setPlayerData(getCurrentPlayer(currentPlayerId));
			} else {
				setTimeout(() => {
					setVisibleTileOne({tile: "", index: -1});
					setVisibleTileTwo({tile: "", index: -1});
					setCurrentPlayerId((id) => {
						let updatedPlayerId = id + 1;
						if (updatedPlayerId > players) {
							updatedPlayerId = 1;
						}
						return updatedPlayerId;
					});
				}, 600);
			}
		}
	}, [visibleTileOne.tile, visibleTileTwo.tile, currentPlayerId, playerData, players]);

	useEffect(() => {
		console.log(initializePlayers(players));
	});

	// Set current player
	useEffect(() => {
		const player = playerData[getCurrentPlayer(currentPlayerId) as keyof PlayerDataCollectionType];
		if (player?.name) {
			setCurrentPlayerName(player.name);
		}
	}, [currentPlayerId, playerData]);

	// Set timer
	useEffect(() => {
		let startTime = Date.now();
		if (gameStarted) {
			setInterval(() => {
				setTimer((timer) => {
					const updatedValues = updateTimer(timer, startTime);
					if (updatedValues.startTime) {
						startTime = updatedValues.startTime;
					}

					return {minutes: updatedValues.minutes, seconds: updatedValues.seconds};
				});
			}, 1000);
		}
	}, [gameStarted]);

	const startGame = () => {
		setGameStarted(true);
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

	const tileVisibility = (tile: string, index: number) => {
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
						{tileVisibility(tileData.id, index) && tileData.tile}
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
