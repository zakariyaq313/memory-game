export type GameConfigType = {
	gameTheme: string,
	numberOfPlayers: string,
	gridSize: string
};

export type IconTileType = {
	id: string,
	tile: JSX.Element
};

export type NumberTileType = {
	id: string,
	tile: number
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

export type StartupScreenProps = {
	onSaveGameConfig: (gameConfig: GameConfigType, screen: string) => void
};

export type GameScreenProps = GameConfigType & {
	onStartNewGame: (screen: string) => void,
};

export type GridProps = {
	gameTheme: string,
	numberOfPlayers: number,
	gridSize: number,
	onGameStarted: (value: boolean) => void,
	onUpdateMovesNeeded: () => void,
	onUpdateCurrentPlayer: (playerNumber: number) => void,
	onSuccessfulGuess: (playerNumber: number) => void,
	onGameCompletion: (gameCompleted: boolean) => void
};

export type TimerProps = {
	gameStarted: boolean,
	gameCompleted: boolean,
	onSubmitTimeNeeded: (timeNeeded: TimerType) => void
};

export type PlayerStatsProps = {
	numberOfPlayers: number,
	currentPlayerNumber: number,
	successfulPlayer: {player: number, time: number},
	gameCompleted: boolean,
	onSubmitPlayerStats: (playerData: PlayerDataCollectionType) => void
};

export type RadioInputType = {
	id: string,
	label: string,
	group: string,
	checked: boolean
};

export type RadioInputProps = RadioInputType & {
	onUpdateGameConfig: (group: string, id: string) => void
};

export type ResultType = {
	movesNeeded: number,
	timeNeeded: TimerType,
	playerStats: PlayerDataCollectionType
};

export type ResultProps = ResultType & {
	numberOfPlayers: number,
	onStartNewGame: () => void,
	onRestartGame: () => void
};
