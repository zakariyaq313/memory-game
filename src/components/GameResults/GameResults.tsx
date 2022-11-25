import { Fragment, useLayoutEffect, useState } from "react";
import { GameResultType } from "../../types/types";
import "./GameResults.scss";

type Props = GameResultType & {
	gameTimedOut: boolean,
	numberOfPlayers: number,
	onStartNewGame: () => void,
	onRestartGame: () => void
};

function GameResults(props: Props): JSX.Element {
	const {
		gameTimedOut,
		numberOfPlayers,
		movesNeeded,
		timeNeeded,
		playerStats,
		highScore,
		onStartNewGame,
		onRestartGame
	} = props;
	const [resultHeading, setResultHeading] = useState("Game results");

	useLayoutEffect(() => {
		const highScoringPlayers: string[] = [];

		for (const player of playerStats) {
			if (player.score === highScore) {
				highScoringPlayers.push(player.label);
			}
		}

		if (highScoringPlayers.length === 1) {
			setResultHeading(`${highScoringPlayers[0]} won!`);
		} else {
			setResultHeading("It's a tie!");
		}
	}, [highScore, playerStats]);

	const restartGame = () => {
		onRestartGame();
	}

	const startNewGame = () => {
		onStartNewGame();
	}
	return (
		<div className="overlay">
			<div className="game-result-card">
				{/* Single player end results */}
				{numberOfPlayers === 1 && (
					<Fragment>
						{gameTimedOut && (
							<Fragment>
								<h1 className="card-heading">Time is up!</h1>
								<p className="card-description">Were you really even playing? :)</p>
							</Fragment>
						)}

						{!gameTimedOut && (
							<Fragment>
								<h1 className="card-heading">You did it!</h1>
								<p className="card-description">Game over! Here's how you got on...</p>
							</Fragment>
						)}

						<div className="result-bars">
							<div className="result-bar info-bar">
								<h3 className="bar-label">Time Elapsed</h3>
								<h2 className="bar-value">{timeNeeded.minutes}:{timeNeeded.seconds}</h2>
							</div>

							<div className="result-bar info-bar">
								<h3 className="bar-label">Moves taken</h3>
								<h2 className="bar-value">{movesNeeded} Moves</h2>
							</div>
						</div>
					</Fragment>
				)}

				{/* Multiplayer end results */}
				{numberOfPlayers > 1 && (
					<Fragment>
						<h1 className="card-heading">{resultHeading}</h1>
						<p className="card-description">Game over! Here are the results...</p>

						<div className="result-bars">
							{playerStats.map((player) => (
								<div key={player.playerNumber} className={`result-bar info-bar 
								${player.score === highScore ? "winner" : ""}`}>
									<h3 className="bar-label">
										{player.label}
										{player.score === highScore && " (Winner!)"}
									</h3>

									<h2 className="bar-value">
										{player.score} {player.score === 1 ? "Pair" : "Pairs"}
									</h2>
								</div>
							))}
						</div>
					</Fragment>
				)}

				<div className="control-buttons">
					<button onClick={restartGame} className="orange-button">Play Again</button>
					<button onClick={startNewGame} className="gray-button">New Game</button>
				</div>
			</div>
		</div>
	);
}

export default GameResults;
