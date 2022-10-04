export type GameConfigType = {
	theme: string,
	players: string,
	gridSize: string
};

export type IconType = {
	id: string,
	tile: JSX.Element
};

export type NumberType = {
	id: string,
	tile: number
};

export type TimerType = {
	minutes: string,
	seconds: string
};

export type PlayerDataType = {
	id: number,
	name: string,
	score: number
};

export type PlayerDataCollectionType = {
	playerOne?: PlayerDataType,
	playerTwo?: PlayerDataType,
	playerThree?: PlayerDataType,
	playerFour?: PlayerDataType
}

export type RadioInputType = {
	id: string,
	label: string,
	group: string,
	checked: boolean
}

export type RadioInputProps = RadioInputType & {
	onUpdateGameConfig: (group: string, id: string) => void
};

export type StartupScreenProps = {
	onSaveGameConfig: (gameConfig: GameConfigType, screen: string) => void
}

export type GameScreenProps = GameConfigType & {

};

export type GridProps = {
	theme: string,
	players: number,
	gridSize: number
};
