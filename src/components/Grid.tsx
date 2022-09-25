import React, { useEffect, useState } from "react";
import { icons, numbers } from "../store/store";
import { GridProps } from "../types/types";
import "../sass/grid/grid.scss";

function Grid(props: GridProps): JSX.Element {
	const {theme, players, gridSize} = props;
	const [gridTiles, setGridTiles] = useState<JSX.Element[] | number[]>([]);
	const [gridColumns, setGridColumns] = useState(4);

	useEffect(() => {
		const numberOfGridTiles: JSX.Element[] | number[] = [];
		// if (theme === "icons") {
		// 	numberOfGridTiles.push(...icons)
		// }

		setGridTiles(numberOfGridTiles);
		setGridColumns(gridSize);
	}, [gridSize]);

	return (
		<React.Fragment>
			<div className="game-grid" style={{gridTemplateColumns: `repeat(${gridColumns}, auto)`}}>
				{/* {gridTiles.map((tile) => (
					<button key={tile}>
						<span>
							{tile}
						</span>
					</button>
				))} */}
			</div>
		</React.Fragment>
	);
}

export default Grid;
