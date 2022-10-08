import { IconTileType, NumberTileType, PlayerDataCollectionType, TimerType } from "../types/types";

export const shuffle = (array: IconTileType[] | NumberTileType[]) => {
    for (let i = (array.length - 1); i >= 0; i--) {
        let j = Math.floor(Math.random() * i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export function updateTimer(timer: TimerType, startTime: number) {
	let currentMinutes: number = Number(timer.minutes);
	let currentSeconds: number = Number(timer.seconds);
	let updatedMinutes: string = timer.minutes;
	let updatedSeconds: string = timer.seconds;
	let updatedStartTime: number = 0;

	if (currentSeconds === 59) {
		updatedStartTime = Date.now();
		currentSeconds = 0;
		currentMinutes = currentMinutes + 1;

		if (currentMinutes < 10) {
			updatedMinutes = "0" + currentMinutes;
		} else {
			updatedMinutes = currentMinutes.toString();
		}
	} else {
		currentSeconds = Math.floor((Date.now() - startTime) / 1000);
	}

	if (currentSeconds < 10) {
		updatedSeconds = "0" + currentSeconds;
	} else {
		updatedSeconds = currentSeconds.toString();
	}

	return { minutes: updatedMinutes, seconds: updatedSeconds, startTime: updatedStartTime };
}

export function initializePlayers(numberOfPlayers: number) {
	const playerDataCollection: PlayerDataCollectionType = {};
	if (numberOfPlayers >= 1) {
		playerDataCollection.playerOne = {
			id: 1,
			name: "Player 1",
			score: 0
		};
	}
	if (numberOfPlayers >= 2) {
		playerDataCollection.playerTwo = {
			id: 2,
			name: "Player 2",
			score: 0
		};
	}
	if (numberOfPlayers >= 3) {
		playerDataCollection.playerThree = {
			id: 3,
			name: "Player 3",
			score: 0
		};
	}
	if (numberOfPlayers === 4) {
		playerDataCollection.playerFour = {
			id: 4,
			name: "Player 4",
			score: 0
		};
	}

    return playerDataCollection;
}

export function getCurrentPlayerId(playerNumber: number) {
	switch (playerNumber) {
		case 2:
			return "playerTwo";
		case 3:
			return "playerThree";
		case 4:
			return "playerFour";
		default:
			return "playerOne";
	}
}
