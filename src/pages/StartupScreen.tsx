import RadioInput from "../components/RadioInput";
import { gameConfigOptions } from "../store/GameConfigOptions";
import "../sass/startup-screen/startup-screen.scss";
import { useReducer } from "react";

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

function StartupScreen(): JSX.Element {
	const [currentGameConfig, setCurrentGameConfig] = useReducer(gameConfigReducer, {
		theme: "numbers",
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
	return (
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

			<button className="start-game-btn">Start Game</button>
		</form>
	);
}

export default StartupScreen;
