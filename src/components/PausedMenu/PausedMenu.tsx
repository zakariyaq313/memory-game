import "./PausedMenu.scss";

type Props = {
	onResumeGame: () => void,
	onRestartGame: () => void,
	onStartNewGame: () => void
};

function PausedMenu(props: Props): JSX.Element {
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
				<h1 className="card-heading">Game paused</h1>
				<button onClick={resumeGame} className="orange-button">Resume</button>
				<button onClick={restartGame} className="gray-button">Restart</button>
				<button onClick={startNewGame} className="gray-button">New Game</button>
			</div>
		</div>
	);
}

export default PausedMenu;
