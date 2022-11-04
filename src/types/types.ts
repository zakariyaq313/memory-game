export type GameModeType = {
	gameTheme: string,
	numberOfPlayers: number,
	gridSize: number
};

export type GameModeOptionType = {
	value: string,
	label: string,
	groupName: string,
	isChecked: boolean,
};

export type GameConfigType = {
	title: string,
	options: GameModeOptionType[]
};

export type TileType = {
	id: string,
	tile: JSX.Element
};

export type TimerType = {
	minutes: string,
	seconds: string
};

export type PlayerDataType = {
	playerNumber: number,
	label: string,
	score: number
};

export type PlayerDataCollectionType = PlayerDataType[];

export type GameResultType = {
	movesNeeded: number,
	timeNeeded: TimerType,
	playerStats: PlayerDataCollectionType,
	highScore: number
};
