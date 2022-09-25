import RadioInput from "../components/RadioInput";
import { gameConfigOptions } from "../store/store";
import "../sass/startup-screen/startup-screen.scss";
import React, { useReducer } from "react";
import { StartupScreenProps } from "../types/types";

type State = {
	theme: string,
	players: string,
	gridSize: string
}

type Action = {
	group: string,
	selectedValue: string
}

function gameConfigReducer(state: State, action: Action): State {
	const updatedState = {...state};

	switch (action.group) {
		case "theme":
			updatedState.theme = action.selectedValue;
			break;
		case "players":
			updatedState.players = action.selectedValue;
			break;
		case "gridSize":
			updatedState.gridSize = action.selectedValue;
			break;
	}

	return updatedState;
}

function StartupScreen(props: StartupScreenProps): JSX.Element {
	const [currentGameConfig, setCurrentGameConfig] = useReducer(gameConfigReducer, {
		theme: "icons",
		players: "one",
		gridSize: "fourTiles"
	});

	const updateGameConfig = (group: string, value: string) => {
		setCurrentGameConfig({
			group: group,
			selectedValue: value
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
