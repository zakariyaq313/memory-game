import { useEffect, useLayoutEffect, useState } from "react";
import { icons, numbers } from "../store/game-data";
import { GridProps, IconTileType, NumberTileType } from "../types/types";
import "../sass/grid/grid.scss";
import { shuffle } from "../helper-functions/helper-functions";
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
	const [gridClass, setGridClass] = useState("");

	const [foundTiles, setFoundTiles] = useState<Set<string>>(new Set(""));
	const [visibleTileOne, setVisibleTileOne] = useState({tile: "", index: -1});
	const [visibleTileTwo, setVisibleTileTwo] = useState({tile: "", index: -1});

	const [gameStarted, setGameStart] = useState(false);
	const [currentPlayerNumber, setCurrentPlayer] = useState(1);

	// Create grid tiles
	useLayoutEffect(() => {
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
	}, [gameTheme, gridSize]);

	useEffect(() => {
		if (visibleTileOne.tile && visibleTileTwo.tile) {
			setTimeout(() => {
				if (visibleTileOne.tile === visibleTileTwo.tile) {
					setFoundTiles((foundTiles) => foundTiles.add(visibleTileOne.tile));
					if (numberOfPlayers > 1) {
						onSuccessfulGuess(currentPlayerNumber);
					}
				} else {
					if (numberOfPlayers > 1) {
						setCurrentPlayer((value) => {
							return (value + 1) > numberOfPlayers ? 1 : (value + 1);
						});
					}
				}

				setVisibleTileOne({tile: "", index: -1});
				setVisibleTileTwo({tile: "", index: -1});
			}, 600);
		}
	}, [visibleTileOne.tile,
		visibleTileTwo.tile,
		currentPlayerNumber,
		numberOfPlayers,
		onSuccessfulGuess
	]);

	useEffect(() => {
		onUpdateCurrentPlayer(currentPlayerNumber);
	}, [currentPlayerNumber, onUpdateCurrentPlayer]);

	// Check game status
	useEffect(() => {
		if (foundTiles.size === ((gridSize ** 2) / 2)) {
			onGameCompletion(true);
		}
	}, [foundTiles.size, gridSize, onGameCompletion]);

	useLayoutEffect(() => {
		if (gridSize === 4) {
			setGridClass("four-tiles-column");
		} else {
			setGridClass("six-tiles-column");
		}
	}, [gridSize]);

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

	const tileIsVisible = (tile: string, index: number) => {
		if (foundTiles.has(tile) || visibleTileOne.index === index || visibleTileTwo.index === index) {
			return true;
		}
		return false;
	}

	const setTileBackground = (tile: string, index: number) => {
		if (foundTiles.has(tile)) {
			return "gray-tile";
		} else if (visibleTileOne.index === index || visibleTileTwo.index === index) {
			return "orange-tile";
		} else {
			return "blue-tile";
		}
	}

	return (
		<div className={`game-grid ${gridClass}`}
			onClick={!gameStarted ? startGame : undefined}>
			{gridTiles.map((tileData, index) => (
				<button key={index}
					onClick={() => revealTile(tileData.id, index)}
					className={`grid-tile ${setTileBackground(tileData.id, index)}`}>
						{tileIsVisible(tileData.id, index) && tileData.tile}
				</button>
			))}
		</div>
	);
}

export default Grid;
