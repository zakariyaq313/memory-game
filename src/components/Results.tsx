import { useEffect, useState } from "react";
import { ResultProps } from "../types/types";
import "../sass/results/results.scss";

function Results(props: ResultProps): JSX.Element {
	const {
		numberOfPlayers,
		movesNeeded,
		timeNeeded,
		playerStats,
		onStartNewGame,
		onRestartGame
	} = props;
	const [highScore, setHighScore] = useState(0);
	
	useEffect(() => {
		if (numberOfPlayers > 1) {
			for (const player of playerStats) {
				if (player.score > highScore) {
					setHighScore(player.score);
				}
			}
		}
	}, [numberOfPlayers, playerStats, highScore]);

	const restartGame = () => {
		onRestartGame();
	}

	const startNewGame = () => {
		onStartNewGame();
	}

	return (
		<div className="result">
			{props.numberOfPlayers === 1 &&
				<h1>
					Moves needed: {movesNeeded},
					Time needed: {timeNeeded.minutes}:{timeNeeded.seconds}
				</h1>
			}
			{props.numberOfPlayers > 1 &&
				playerStats.map((player) => (
					<h1 key={player.playerNumber}>
						{player.label}: {player.score} {player.score === highScore && "(winner)"}
					</h1>
				))
			}

			<button onClick={restartGame}>Restart</button>
			<button onClick={startNewGame}>New Game</button>
		</div>
	);
}

export default Results;
