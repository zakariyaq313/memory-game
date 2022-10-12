import React, { useEffect, useReducer } from "react";
import { initializePlayers } from "../helper/helper-functions";
import { PlayerDataCollectionType, PlayerStatsProps } from "../types/types";

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
		if (gameCompleted) {
			onSubmitPlayerStats(playerData);
		}
	}, [gameCompleted, playerData, onSubmitPlayerStats]);

	return (
		<React.Fragment>
			{playerData.map((player) => (
				<h1 key={player.playerNumber}>
					{player.label}: {player.score} 
					{currentPlayerNumber === player.playerNumber && "(current player)"}
				</h1>
			))}
		</React.Fragment>
	);
}

export default PlayerStats;
