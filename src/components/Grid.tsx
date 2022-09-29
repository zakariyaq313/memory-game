import React, { useEffect, useState } from "react";
import { icons, numbers } from "../store/game-data";
import { GridProps, IconType, NumberType } from "../types/types";
import "../sass/grid/grid.scss";
import { shuffle } from "../helper/helper-functions";
import { Set } from "typescript";

function Grid(props: GridProps): JSX.Element {
	const {theme, players, gridSize} = props;
	const [gridTiles, setGridTiles] = useState<IconType[] | NumberType[]>([]);
	const [gridColumns, setGridColumns] = useState(4);
	const [foundTiles, setFoundTiles] = useState<Set<string>>(new Set(""));
	const [visibleTileOne, setVisibleTileOne] = useState({tile: "", index: -1});
	const [visibleTileTwo, setVisibleTileTwo] = useState({tile: "", index: -1});

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
			if (visibleTileOne.tile === visibleTileTwo.tile) {
				setFoundTiles((foundTiles) => foundTiles.add(visibleTileOne.tile));
				setVisibleTileOne({tile: "", index: -1});
				setVisibleTileTwo({tile: "", index: -1});
			} else {
				setTimeout(() => {
					setVisibleTileOne({tile: "", index: -1});
					setVisibleTileTwo({tile: "", index: -1});
				}, 600);
			}
		}
	}, [visibleTileOne.tile, visibleTileTwo.tile]);

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
			<div className="game-grid" style={{gridTemplateColumns: `repeat(${gridColumns}, auto)`}}>
				{gridTiles.map((tileData, index) => (
					<button key={index} onClick={() => revealTile(tileData.id, index)}>
						{tileVisibility(tileData.id, index) && tileData.tile}
					</button>
				))}
			</div>
		</React.Fragment>
	);
}

export default Grid;
