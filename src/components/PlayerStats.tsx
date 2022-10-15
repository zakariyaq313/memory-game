import React, { useEffect, useReducer, useState } from "react";
import { initializePlayers } from "../helper/helper-functions";
import { PlayerDataCollectionType, PlayerStatsProps } from "../types/types";
import "../sass/game-stats/game-stats.scss";

type Action = {
	type: string,
	successfulPlayer: number,
	numberOfPlayers: number
};

const updatePlayerStats = (state: PlayerDataCollectionType, action: Action) => {
	if (action.type === "initialize") {
		return initializePlayers(action.numberOfPlayers);
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
	const [statsSubmitted, setStatsSubmitted] = useState(false);

	// Set initial data for players
	useEffect(() => {
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
		if (gameCompleted && !statsSubmitted) {
			onSubmitPlayerStats(playerData);
			setStatsSubmitted(true);
		}
	}, [gameCompleted, statsSubmitted, playerData, onSubmitPlayerStats]);

	return (
		<React.Fragment>
			{playerData.map((player) => (
				<div key={player.playerNumber} className="stat-box">
					<h3 className="stat-label">{player.label}</h3>
					<h2 className="stat-value">{player.score}</h2>
				</div>
			))}
		</React.Fragment>
	);
}

export default PlayerStats;
