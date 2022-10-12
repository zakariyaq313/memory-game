import RadioInput from "../components/RadioInput";
import { gameConfigOptions } from "../store/game-data";
import "../sass/startup-screen/startup-screen.scss";
import React, { useReducer } from "react";
import { StartupScreenProps } from "../types/types";

type State = {
	gameTheme: string,
	numberOfPlayers: string,
	gridSize: string
}

type Action = {
	group: string,
	value: string
}

function gameConfigReducer(state: State, action: Action): State {
	switch (action.group) {
		case "gameTheme":
			return {...state, gameTheme: action.value};
		case "numberOfPlayers":
			return {...state, numberOfPlayers: action.value};
		case "gridSize":
			return {...state, gridSize: action.value};
		default:
			throw Error("Unknown group name selected in 'gameConfigReducer.'");
	}
}

function StartupScreen(props: StartupScreenProps): JSX.Element {
	const [currentGameConfig, setCurrentGameConfig] = useReducer(gameConfigReducer, {
		gameTheme: "icons",
		numberOfPlayers: "one",
		gridSize: "fourTiles"
	});

	const updateGameConfig = (group: string, value: string) => {
		setCurrentGameConfig({
			group: group,
			value: value
		});
	}

	const valueIsSelected = (group: string, id: string) => {
		return currentGameConfig[group as keyof State] === id;
	}

	const startGame = (e: React.FormEvent) => {
		e.preventDefault();
		props.onSaveGameConfig(currentGameConfig, "in-game");
	}
	return (
		<main>
			<form>
				{gameConfigOptions.map((gameConfigGroup, index) => (
					<div key={index}>
						{gameConfigGroup.map((gameConfig) => (
							<RadioInput key={gameConfig.id}
								id={gameConfig.id}
								label={gameConfig.label}
								group={gameConfig.group}
								checked={valueIsSelected(gameConfig.group, gameConfig.id)}
								onUpdateGameConfig={updateGameConfig}
							/>
						))}
					</div>
				))}

				<button onClick={startGame} className="start-game-btn">Start Game</button>
			</form>
		</main>
	);
}

export default StartupScreen;
