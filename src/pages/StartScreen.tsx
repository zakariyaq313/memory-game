import React, { useReducer } from "react";
import { gameConfig } from "../store/game-data";
import { GameModeReducerAction, GameModeReducerState, StartScreenProps } from "../types/types";
import SelectOption from "../components/GameModeOption";
import "../sass/start-screen/start-screen.scss";
import "../sass/components/components.scss";

function gameModeReducer(state: GameModeReducerState, action: GameModeReducerAction) {
	if (action.type === "gameTheme" && action.gameTheme) {
		return {...state,
			gameTheme: action.gameTheme
		};
	} else if (action.type === "numberOfPlayers" && action.numberOfPlayers) {
		return {...state,
			numberOfPlayers: Number(action.numberOfPlayers)
		};
	} else if (action.type === "gridSize" && action.gridSize) {
		return {...state,
			gridSize: action.gridSize === "four" ? 4 : 6
		};
	} else {
		return {...state};
	}
}

function StartScreen(props: StartScreenProps): JSX.Element {
	const [currentGameMode, setCurrentGameMode] = useReducer(gameModeReducer, {
		gameTheme: "icons",
		numberOfPlayers: 1,
		gridSize: 4
	});

	const updateGameMode = (groupName: string, value: string) => {
		setCurrentGameMode({
			type: groupName,
			[groupName as keyof GameModeReducerAction]: value
		});
	}

	const optionSelected = (groupName: string, value: string) => {
		if (groupName === "numberOfPlayers") {
			return currentGameMode[groupName as keyof GameModeReducerState] === Number(value);
		} else if (groupName === "gridSize") {
			return currentGameMode[groupName as keyof GameModeReducerState] === ((value === "four") ? 4 : 6);
		} else {
			return currentGameMode[groupName as keyof GameModeReducerState] === value;
		}
	}

	const startGame = (e: React.MouseEvent) => {
		e.preventDefault();
		props.onEnterGameScreen(currentGameMode);
	}

	return (
		<main className="startup-screen">
			<form className="game-config-tab">
				<h1 className="app-title">Memory</h1>

				{gameConfig.map((gameConfigGroup) => (
					<div key={gameConfigGroup.title} className={`option-group 
						${gameConfigGroup.options.length === 2 ? "two-options" : "four-options"}`}>
							<h3 className="group-title">{gameConfigGroup.title}</h3>

							{gameConfigGroup.options.map((option) => (
								<SelectOption key={option.value}
									value={option.value}
									label={option.label}
									groupName={option.groupName}
									isChecked={optionSelected(option.groupName, option.value)}
									onUpdateGameMode={updateGameMode}
								/>
							))}
					</div>
				))}

				<button onClick={(e) => startGame(e)} className="start-game-button orange-button">
					Start Game
				</button>
			</form>

			<p className="credit">Created by
				<a href="https://zakariyaq313.github.io/my-website/" target="_blank" rel="noreferrer">
					Muhammad Zakariya
				</a>
			</p>
		</main>
	);
}

export default StartScreen;
