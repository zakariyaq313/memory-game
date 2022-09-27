import React, { useEffect, useState } from "react";
import { icons, numbers } from "../store/store";
import { GridProps } from "../types/types";
import "../sass/grid/grid.scss";
import { shuffle } from "../helper/helper-functions";

function Grid(props: GridProps): JSX.Element {
	const {theme, players, gridSize} = props;
	const [gridTiles, setGridTiles] = useState<JSX.Element[] | number[]>([]);
	const [gridColumns, setGridColumns] = useState(4);

	useEffect(() => {
		const iconTiles: JSX.Element[] = [];
		const numberTiles: number[] = [];

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

	return (
		<React.Fragment>
			<div className="game-grid" style={{gridTemplateColumns: `repeat(${gridColumns}, auto)`}}>
				{gridTiles.map((tile, index) => (
					<button key={index}>
						{tile}
					</button>
				))}
			</div>
		</React.Fragment>
	);
}

export default Grid;
