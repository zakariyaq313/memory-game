import { useState } from "react";
import GameScreen from "./pages/GameScreen";
import StartupScreen from "./pages/StartupScreen";
import "./sass/base/base.scss";
import { GameConfigType } from "./types/types";

function App(): JSX.Element {
	const [currentScreen, setCurrentScreen] = useState("start-up");
	const [gameConfig, setGameConfig] = useState<GameConfigType>({
		gameTheme: "",
		numberOfPlayers: "",
		gridSize: ""
	})

	const saveGameConfig = (savedGameConfig: GameConfigType, screen: string) => {
		setGameConfig({
			gameTheme: savedGameConfig.gameTheme,
			numberOfPlayers: savedGameConfig.numberOfPlayers,
			gridSize: savedGameConfig.gridSize
		});

		setCurrentScreen(screen);
	}

	const startNewGame = (screen: string) => {
		setCurrentScreen(screen);
	}
	return (
		<div className="App">
			{currentScreen === "start-up" &&
				<StartupScreen onSaveGameConfig={saveGameConfig} />
			}
			{currentScreen === "in-game" &&
				<GameScreen gameTheme={gameConfig.gameTheme} 
					numberOfPlayers={gameConfig.numberOfPlayers}
					gridSize={gameConfig.gridSize}
					onStartNewGame={startNewGame}
				/>
			}
		</div>
	);
}

export default App;
