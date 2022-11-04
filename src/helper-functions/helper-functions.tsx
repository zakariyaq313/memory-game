import { PlayerDataCollectionType, TileType, TimerType } from "../types/types";

// Random shuffle via Fisher Yates Algorithm
export function randomShuffle (tiles: TileType[]) {
	for (let i = (tiles.length - 1); i >= 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[tiles[i], tiles[j]] = [tiles[j], tiles[i]];
	}

	return tiles;
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
		updatedMinutes = (currentMinutes + 1).toString();
		currentSeconds = 0;
	} else {
		const calculatedSeconds = Math.floor((Date.now() - startTime) / 1000);
		// When the game is resumed from pause, startTime is reset to Date.now() and
		// calculatedSeconds evaluates to 0, but the timer likely has a higher value
		// saved for seconds, therefore, updated seconds can simply be saved seconds + 1
		if (calculatedSeconds < currentSeconds) {
			currentSeconds = currentSeconds + 1;			
		} else {
			currentSeconds = calculatedSeconds;			
		}
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
export function initializePlayerStats(numberOfPlayers: number): PlayerDataCollectionType {
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

// Create number tiles
export function createNumberTiles (value: number) {
	const numberTiles: TileType[] = [];
	for (let i = 1; i <= value; i++) {
		const tileData = {
			id: "number-tile-" + i,
			tile: <span>{i}</span>
		};

		numberTiles.push(tileData);
	}

	return numberTiles;
}
