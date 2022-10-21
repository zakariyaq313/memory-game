import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { PlayerDataCollectionType, PlayerStatsProps } from "../types/types";
import "../sass/game-stats/game-stats.scss";
import { initializePlayerStats } from "../helper-functions/helper-functions";

type Action = {
	type: string,
	successfulPlayer: number,
	numberOfPlayers: number
};

const updatePlayerStats = (state: PlayerDataCollectionType, action: Action) => {
	if (action.type === "initialize") {
		return initializePlayerStats(action.numberOfPlayers);
	} else {
		return state.map((playerData) => {
			if (action.successfulPlayer === playerData.playerNumber) {
				return {...playerData, score: playerData.score + 1};
			}
			return playerData;
		});
	}
}

function PlayerStats(props: PlayerStatsProps): JSX.Element {
	const {
		numberOfPlayers,
		currentPlayerNumber,
		successfulPlayer,
		gameCompleted,
		onSubmitPlayerStats
	} = props;
	const [playerData, setPlayerData] = useReducer(updatePlayerStats, []);
	const [highScore, setHighScore] = useState(0);
	const [statsSubmitted, setStatsSubmitted] = useState(false);

	// Set initial data for players
	useLayoutEffect(() => {
		setPlayerData({
			type: "initialize",
			successfulPlayer: 0,
			numberOfPlayers: numberOfPlayers
		});
	}, [numberOfPlayers]);

	// Update player stats
	useEffect(() => {
		if (successfulPlayer.player) {
			setPlayerData({
				type: "update",
				successfulPlayer: successfulPlayer.player,
				numberOfPlayers: numberOfPlayers
			});
		}
	}, [successfulPlayer, numberOfPlayers]);

	useEffect(() => {
		for (const player of playerData) {
			setHighScore((currentHigh) => Math.max(currentHigh, player.score));
		}
	}, [playerData]);

	useEffect(() => {
		if (gameCompleted && !statsSubmitted) {
			onSubmitPlayerStats(playerData, highScore);
			setStatsSubmitted(true);
		}
	}, [gameCompleted, statsSubmitted, playerData, highScore, onSubmitPlayerStats]);

	return (
		<React.Fragment>
			{playerData.map((player) => (
				<div key={player.playerNumber} className={`stat-bar info-bar
					${player.playerNumber === currentPlayerNumber ? "current-player" : ""}`}>
						<h3 className="bar-label">{player.label}</h3>
						<h2 className="bar-value">{player.score}</h2>

						{player.playerNumber === currentPlayerNumber && (
							<span>Current turn</span>
						)}
				</div>
			))}
		</React.Fragment>
	);
}

export default PlayerStats;
