import React, { useEffect, useState } from "react";
import { icons, numbers } from "../store/game-data";
import { GridProps, IconTileType, NumberTileType } from "../types/types";
import "../sass/grid/grid.scss";
import { shuffle } from "../helper/helper-functions";
import { Set } from "typescript";

function Grid(props: GridProps): JSX.Element {
	const {
		gameTheme,
		numberOfPlayers,
		gridSize,
		onGameStarted,
		onUpdateMovesNeeded,
		onUpdateCurrentPlayer,
		onSuccessfulGuess,
		onGameCompletion
	} = props;

	const [gridTiles, setGridTiles] = useState<IconTileType[] | NumberTileType[]>([]);
	const [gridColumns, setGridColumns] = useState(4);

	const [foundTiles, setFoundTiles] = useState<Set<string>>(new Set(""));
	const [visibleTileOne, setVisibleTileOne] = useState({tile: "", index: -1});
	const [visibleTileTwo, setVisibleTileTwo] = useState({tile: "", index: -1});

	const [gameStarted, setGameStart] = useState(false);
	const [gameCompleted, setGameCompletion] = useState(false);
	const [currentPlayerNumber, setCurrentPlayer] = useState(1);

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
			if (visibleTileOne.tile === visibleTileTwo.tile) {
				setFoundTiles((foundTiles) => foundTiles.add(visibleTileOne.tile));
				setVisibleTileOne({tile: "", index: -1});
				setVisibleTileTwo({tile: "", index: -1});

				if (numberOfPlayers > 1) {
					onSuccessfulGuess(currentPlayerNumber);
				}
			} else {
				setTimeout(() => {
					setVisibleTileOne({tile: "", index: -1});
					setVisibleTileTwo({tile: "", index: -1});
					
					if (numberOfPlayers > 1) {
						setCurrentPlayer((value) => {
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
	}, [visibleTileOne.tile,
		visibleTileTwo.tile,
		currentPlayerNumber,
		numberOfPlayers,
		onSuccessfulGuess
	]);

	useEffect(() => {
		if (!gameCompleted) {
			onUpdateCurrentPlayer(currentPlayerNumber);
		}
	}, [gameCompleted, currentPlayerNumber, onUpdateCurrentPlayer]);

	// Check game status
	useEffect(() => {
		if (!gameCompleted && foundTiles.size === ((gridSize ** 2) / 2)) {
			setGameCompletion(true);
			onGameCompletion(true);
		}
	}, [foundTiles.size, gameCompleted, gridSize, onGameCompletion]);

	const startGame = () => {
		setGameStart(true);
		onGameStarted(true);
	}

	const revealTile = (tile: string, index: number) => {
		if (!foundTiles.has(tile)) {
			if (!visibleTileOne.tile) {
				setVisibleTileOne({tile: tile, index: index})
			} else if (!visibleTileTwo.tile && index !== visibleTileOne.index) {
				setVisibleTileTwo({tile: tile, index: index});
				if (numberOfPlayers === 1) {
					onUpdateMovesNeeded();
				}
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
		</React.Fragment>
	);
}

export default Grid;
