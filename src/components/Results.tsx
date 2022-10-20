import React, { useLayoutEffect, useState } from "react";
import { ResultProps } from "../types/types";
import "../sass/results/results.scss";

function Results(props: ResultProps): JSX.Element {
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
			<div className="popup-card">
				{/* Single player end results */}
				{numberOfPlayers === 1 && (
					<React.Fragment>
						{gameTimedOut && (
							<React.Fragment>
								<h1 className="card-heading">Time is up!</h1>
								<p className="card-description">Were you really even playing? :)</p>
							</React.Fragment>
						)}

						{!gameTimedOut && (
							<React.Fragment>
								<h1 className="card-heading">You did it!</h1>
								<p className="card-description">Game over! Here's how you got on...</p>
							</React.Fragment>
						)}

						<div className="result-bars">
							<div className="result-bar info-bar">
								<h3 className="bar-label">Time Elapsed</h3>
								<h2 className="bar-value">{timeNeeded.minutes}:{timeNeeded.seconds}</h2>
							</div>

							<div className="result-bar info-bar">
								<h3 className="bar-label">Moves expended</h3>
								<h2 className="bar-value">{movesNeeded} Moves</h2>
							</div>
						</div>
					</React.Fragment>
				)}

				{/* Multiplayer end results */}
				{numberOfPlayers > 1 && (
					<React.Fragment>
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
					</React.Fragment>
				)}

				<div className="control-buttons">
					<button onClick={restartGame} className="orange-button">
						Play Again
					</button>

					<button onClick={startNewGame} className="gray-button">
						Setup New Game
					</button>
				</div>
			</div>
		</div>
	);
}

export default Results;
