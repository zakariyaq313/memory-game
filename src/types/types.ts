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

export type GameModeReducerState = {
	gameTheme: string,
	numberOfPlayers: number,
	gridSize: number
};

export type GameModeReducerAction = {
	type: string,
	gameTheme?: string,
	numberOfPlayers?: string,
	gridSize?: string
};

export type GameResultReducerState = GameResultType;

export type GameResultReducerAction = {
	type: String,
	movesNeeded?: number,
	timeNeeded?: TimerType,
	playerStats?: PlayerDataCollectionType,
	highScore?: number,
	numberOfPlayers?: number
};

export type PlayerStatsReducerState = PlayerDataCollectionType;

export type PlayerStatsReducerAction = {
	type: string,
	successfulPlayer: number,
	numberOfPlayers: number
};

export type StartScreenProps = {
	onEnterGameScreen: (gameMode: GameModeType) => void
};

export type GameScreenProps = GameModeType & {
	onStartNewGame: () => void,
};

export type GameModeOptionProps = GameModeOptionType & {
	onUpdateGameMode: (group: string, value: string) => void
};

export type GridProps = {
	gameTheme: string,
	numberOfPlayers: number,
	gridSize: number,
	onGameStarted: () => void,
	onUpdateMovesNeeded: () => void,
	onUpdateCurrentPlayer: (playerNumber: number) => void,
	onSuccessfulGuess: (playerNumber: number) => void,
	onGameCompleted: () => void
};

export type TimerProps = {
	gameStarted: boolean,
	gamePaused: boolean,
	gameCompleted: boolean,
	onGameTimedOut: () => void,
	onSubmitTimeNeeded: (timeNeeded: TimerType) => void
};

export type MultiPlayerStatsProps = {
	numberOfPlayers: number,
	currentPlayerNumber: number,
	successfulPlayer: {player: number, time: number},
	gameCompleted: boolean,
	onSubmitPlayerStats: (playerData: PlayerDataCollectionType, highScore: number) => void
};

export type PausedMenuProps = {
	onResumeGame: () => void,
	onRestartGame: () => void,
	onStartNewGame: () => void
};

export type GameResultProps = GameResultType & {
	gameTimedOut: boolean,
	numberOfPlayers: number,
	onStartNewGame: () => void,
	onRestartGame: () => void
};
