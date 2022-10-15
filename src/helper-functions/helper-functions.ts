import { IconTileType, NumberTileType, PlayerDataCollectionType, TimerType } from "../types/types";

// Random shuffle via Fisher Yates Algorithm
export const shuffle = (array: IconTileType[] | NumberTileType[]) => {
    for (let i = (array.length - 1); i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// Timer update function
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

	return {
		minutes: updatedMinutes,
		seconds: updatedSeconds,
		startTime: updatedStartTime
	};
}

// Initial player stats depending on the number of players
export function initializePlayers(numberOfPlayers: number): PlayerDataCollectionType {
	const playerDataCollection: PlayerDataCollectionType = [];

	const playerOne = {
		playerNumber: 1,
		label: "Player 1",
		score: 0
	};

	const playerTwo = {
		playerNumber: 2,
		label: "Player 2",
		score: 0
	};

	const playerThree = {
		playerNumber: 3,
		label: "Player 3",
		score: 0
	};

	const playerFour = {
		playerNumber: 4,
		label: "Player 4",
		score: 0
	};

	if (numberOfPlayers >= 1) {
		playerDataCollection.push(playerOne); 
	}
	if (numberOfPlayers >= 2) {
		playerDataCollection.push(playerTwo);
	}
	if (numberOfPlayers >= 3) {
		playerDataCollection.push(playerThree);
	}
	if (numberOfPlayers === 4) {
		playerDataCollection.push(playerFour);
	}

    return playerDataCollection;
}