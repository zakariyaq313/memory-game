import { useState } from "react";
import GameScreen from "./screens/GameScreen/GameScreen";
import StartScreen from "./screens/StartScreen/StartScreen";
import { GameModeType } from "./types/types";
import "./sass/base/base.scss";

function App(): JSX.Element {
	// Can be "start-screen" or "game-screen"
	const [currentScreen, setCurrentScreen] = useState("start-screen");
	const [gameMode, setGameMode] = useState<GameModeType>({
		gameTheme: "icons",
		numberOfPlayers: 1,
		gridSize: 4
	})

	const enterGameScreen = (savedGameMode: GameModeType) => {
		setGameMode({
			gameTheme: savedGameMode.gameTheme,
			numberOfPlayers: savedGameMode.numberOfPlayers,
			gridSize: savedGameMode.gridSize
		});

		setCurrentScreen("game-screen");
	}

	const startNewGame = () => {
		setCurrentScreen("start-screen");
	}

	return (
		<div className="App">
			{currentScreen === "start-screen" && (
				<StartScreen onEnterGameScreen={enterGameScreen} />
			)}

			{currentScreen === "game-screen" && (
				<GameScreen gameTheme={gameMode.gameTheme} 
					numberOfPlayers={gameMode.numberOfPlayers}
					gridSize={gameMode.gridSize}
					onStartNewGame={startNewGame}
				/>
			)}
		</div>
	);
}

export default App;
