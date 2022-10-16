import React, { useEffect, useLayoutEffect, useState } from "react";
import { ResultProps } from "../types/types";
import "../sass/results/results.scss";

function Results(props: ResultProps): JSX.Element {
	const {
		numberOfPlayers,
		movesNeeded,
		timeNeeded,
		playerStats,
		highScore,
		onStartNewGame,
		onRestartGame
	} = props;
	const [highScoringPlayers, setHighScoringPlayers] = useState<string[]>([]);
	const [resultHeading, setResultHeading] = useState("Game results");

	useEffect(() => {
		for (const player of playerStats) {
			if (player.score === highScore) {
				setHighScoringPlayers((players) => [...players, player.label]);
			}
		}
	}, [highScore, playerStats]);

	useLayoutEffect(() => {
		if (highScoringPlayers.length === 1) {
			setResultHeading(`${highScoringPlayers[0]} won!`);
		} else {
			setResultHeading("It's a tie!");
		}
	}, [highScoringPlayers]);

	const restartGame = () => {
		onRestartGame();
	}

	const startNewGame = () => {
		onStartNewGame();
	}

	return (
		<div className="overlay">
			<div className="result-card">
				{/* Single player end results */}
				{numberOfPlayers === 1 && (
					<React.Fragment>
						<h1 className="result-heading">You did it!</h1>
						<p className="result-description">Game over! Here's how you got on...</p>

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
					</React.Fragment>
				)}

				{/* Multiplayer end results */}
				{numberOfPlayers > 1 && (
					<React.Fragment>
						<h1 className="result-heading">{resultHeading}</h1>
						<p className="result-description">Game over! Here are the results...</p>

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
						Restart
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
