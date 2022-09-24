import React from "react";
import Grid from "../components/Grid";
import { GameScreenProps } from "../types/types";

function GameScreen(props: GameScreenProps): JSX.Element {
	return (
		<React.Fragment>
			<header>
				<h1>Memory</h1>
			</header>
			<main>
				<Grid />
			</main>
		</React.Fragment>
	);
}

export default GameScreen;
