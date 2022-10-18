import { PausedMenuProps } from "../types/types";
import "../sass/paused-screen/paused-screen.scss";

function PausedMenu(props: PausedMenuProps): JSX.Element {
	const {onResumeGame, onRestartGame, onStartNewGame} = props;

	const resumeGame = () => {
		onResumeGame();
	}

	const restartGame = () => {
		onRestartGame();
	}

	const startNewGame = () => {
		onStartNewGame();
	}
	return (
		<div className="overlay">
			<div className="paused-menu-card">
				<h1>Game paused</h1>
				<button onClick={resumeGame} className="orange-button">Resume</button>
				<button onClick={restartGame} className="gray-button">Restart</button>
				<button onClick={startNewGame} className="gray-button">New Game</button>
			</div>
		</div>
	);
}

export default PausedMenu;
