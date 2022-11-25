import { Fragment, useEffect, useLayoutEffect, useReducer, useState } from "react";
import { initializePlayerStats } from "../../helper-functions/helper-functions";
import { PlayerDataCollectionType } from "../../types/types";
import "./MultiplayerStats.scss";

type State = PlayerDataCollectionType;
type Action = {
	type: string,
	successfulPlayer: number,
	numberOfPlayers: number
};

function playerStatsReducer (state: State, action: Action) {
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

type Props = {
	numberOfPlayers: number,
	currentPlayerNumber: number,
	// Only playerNumber needed here, but time (Date.now) added to trigger a re-render
	// in case updated value of playerNumber is the same as orignal value
	successfulPlayer: {player: number, time: number},
	gameCompleted: boolean,
	onSubmitPlayerStats: (playerData: PlayerDataCollectionType, highScore: number) => void
};

function MultiplayerStats(props: Props): JSX.Element {
	const {
		numberOfPlayers,
		currentPlayerNumber,
		successfulPlayer,
		gameCompleted,
		onSubmitPlayerStats
	} = props;

	const [playerData, setPlayerData] = useReducer(playerStatsReducer, []);
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
		<Fragment>
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
		</Fragment>
	);
}

export default MultiplayerStats;
