import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import { GameScreenProps } from "../types/types";

function GameScreen(props: GameScreenProps): JSX.Element {
	const [theme, setTheme] = useState("icons");
	const [players, setPlayers] = useState(1);
	const [gridSize, setGridSize] = useState(4);

	useEffect(() => {
		if (props.theme === "numbers") {
			setTheme("numbers");
		} else {
			setTheme("icons");
		}
	}, [props.theme]);

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

	return (
		<React.Fragment>
			<header>
				<h1>Memory</h1>
			</header>
			<main>
				<Grid theme={theme} players={players} gridSize={gridSize} />
			</main>
		</React.Fragment>
	);
}

export default GameScreen;
