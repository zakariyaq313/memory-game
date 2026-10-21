import type { PlayerDataCollectionType, TileType, TimerType } from "../types/types";

// Random shuffle via Fisher Yates Algorithm
export function randomShuffle (tiles: TileType[]) {
	for (let i = (tiles.length - 1); i >= 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[tiles[i], tiles[j]] = [tiles[j], tiles[i]];
	}

	return tiles;
}

// Format elapsed time into minutes and seconds
export function formatTime(elapsedMs: number): TimerType {
	const totalSeconds = Math.floor(elapsedMs / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	return {
		minutes: minutes.toString(),
		seconds: seconds.toString().padStart(2, "0")
	};
}

// Initial player stats depending on the number of players
export function initializePlayerStats(numberOfPlayers: number): PlayerDataCollectionType {
	const playerDataCollection: PlayerDataCollectionType = [];
	for (let i = 1; i <= numberOfPlayers; i++) {
		playerDataCollection.push({
			playerNumber: i,
			label: ("Player " + i),
			score: 0
		});
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
