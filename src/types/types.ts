export type GameConfigType = {
	theme: string,
	players: string,
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
	key: number,
	label: string,
	score: number
};

// export type PlayerDataCollectionType = {
// 	playerOne?: PlayerDataType,
// 	playerTwo?: PlayerDataType,
// 	playerThree?: PlayerDataType,
// 	playerFour?: PlayerDataType
// };

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
	onGameCompletion: (gameOver: boolean, results: ResultType) => void
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
	timeNeeded: TimerType
	playerData: PlayerDataCollectionType
};

export type ResultProps = ResultType & {
	numberOfPlayers: number
};
