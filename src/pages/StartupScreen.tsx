import RadioInput from "../components/RadioInput";
import { gameConfigOptions } from "../store/game-data";
import "../sass/startup-screen/startup-screen.scss";
import "../sass/components/components.scss";
import React, { useReducer } from "react";
import { StartupScreenProps } from "../types/types";
import Logo from "../icons/Logo";

type State = {
	gameTheme: string,
	numberOfPlayers: string,
	gridSize: string
}

type Action = {
	groupName: string,
	value: string
}

function gameConfigReducer(state: State, action: Action): State {
	switch (action.groupName) {
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
		numberOfPlayers: "1",
		gridSize: "four"
	});

	const updateGameConfig = (groupName: string, value: string) => {
		setCurrentGameConfig({
			groupName: groupName,
			value: value
		});
	}

	const valueIsSelected = (groupName: string, value: string) => {
		return currentGameConfig[groupName as keyof State] === value;
	}

	const startGame = (e: React.MouseEvent) => {
		e.preventDefault();
		props.onSaveGameConfig(currentGameConfig, "in-game");
	}
	return (
		<main className="startup-screen">
			<form className="game-config-tab">
				<h1 className="app-title">
					<Logo />
					<span>Memory</span>
				</h1>
				{gameConfigOptions.map((gameConfigGroup, i) => (
					<div key={i} className={`option-group 
						${(gameConfigGroup.length - 1) === 2 ? "two-options" : "four-options"}`}>
						{gameConfigGroup.map((gameConfig, j) => (
							// Ternary operator used to render either the
							// group title or the radio option component
							(typeof gameConfig === "string" ?
								<h3 key={j} className="group-title">{gameConfig}</h3> :

								<RadioInput key={gameConfig.value}
									value={gameConfig.value}
									label={gameConfig.label}
									groupName={gameConfig.groupName}
									isChecked={valueIsSelected(gameConfig.groupName, gameConfig.value)}
									onUpdateGameConfig={updateGameConfig}
								/>
							)
						))}
					</div>
				))}

				<button onClick={(e) => startGame(e)} className="start-game-button orange-button">
					Start Game
				</button>
			</form>
		</main>
	);
}

export default StartupScreen;
