import { useEffect, useLayoutEffect, useState } from "react";
import { iconTilesCollection, numberTilesCollection } from "../store/game-data";
import { shuffle } from "../helper-functions/helper-functions";
import { GridProps, TileType } from "../types/types";
import "../sass/tiles-grid/tiles-grid.scss";

function TilesGrid(props: GridProps): JSX.Element {
	const {
		gameTheme,
		numberOfPlayers,
		gridSize,
		onGameStarted,
		onUpdateMovesNeeded,
		onUpdateCurrentPlayer,
		onSuccessfulGuess,
		onGameCompleted
	} = props;

	const [gridTiles, setGridTiles] = useState<TileType[]>([]);
	const [gridClass, setGridClass] = useState("");

	const [foundTiles, setFoundTiles] = useState<Set<string>>(new Set(""));
	const [visibleTileOne, setVisibleTileOne] = useState({tile: "", index: -1});
	const [visibleTileTwo, setVisibleTileTwo] = useState({tile: "", index: -1});

	const [gameStarted, setGameStart] = useState(false);
	const [currentPlayerNumber, setCurrentPlayer] = useState(1);

	// Create grid tiles
	useLayoutEffect(() => {
		const tiles: TileType[] = [];

		if (gameTheme === "icons") {
			for (const tile of iconTilesCollection) {
				tiles.push(tile, tile);
			}
		} else {
			for (const tile of numberTilesCollection) {
				tiles.push(tile, tile);
			}
		}

		(gridSize === 4) && (tiles.splice(16));
		setGridTiles(shuffle(tiles));
	}, [gameTheme, gridSize]);

	// Compare the two temporary tiles
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
		onSuccessfulGuess,
	]);

	useEffect(() => {
		onUpdateCurrentPlayer(currentPlayerNumber);
	}, [currentPlayerNumber, onUpdateCurrentPlayer]);

	useEffect(() => {
		if (foundTiles.size === ((gridSize ** 2) / 2)) {
			onGameCompleted();
		}
	}, [foundTiles.size, gridSize, onGameCompleted]);

	useLayoutEffect(() => {
		if (gridSize === 4) {
			setGridClass("four-tiles-column");
		} else {
			setGridClass("six-tiles-column");
		}
	}, [gridSize]);

	const startGame = () => {
		setGameStart(true);
		onGameStarted();
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
						{tileIsVisible(tileData.id, index) && (
							tileData.tile
						)}
				</button>
			))}
		</div>
	);
}

export default TilesGrid;
