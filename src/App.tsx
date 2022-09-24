import { useState } from "react";
import GameScreen from "./pages/GameScreen";
import StartupScreen from "./pages/StartupScreen";
import "./sass/base/base.scss";
import { gameConfigType } from "./types/types";

function App(): JSX.Element {
	const [currentScreen, setCurrentScreen] = useState("start-up");
	const [gameConfig, setGameConfig] = useState<gameConfigType>({
		theme: "",
		players: "",
		gridSize: ""
	})

	const saveGameConfig = (savedGameConfig: gameConfigType, screen: string) => {
		setGameConfig({
			theme: savedGameConfig.theme,
			players: savedGameConfig.players,
			gridSize: savedGameConfig.gridSize
		});

		setCurrentScreen(screen);
	}
	return (
		<div className="App">
			{currentScreen === "start-up" &&
				<StartupScreen onSaveGameConfig={saveGameConfig} />
			}
			{currentScreen === "in-game" &&
				<GameScreen theme={gameConfig.theme} 
					players={gameConfig.players}
					gridSize={gameConfig.gridSize}
				/>
			}
		</div>
	);
}

export default App;
