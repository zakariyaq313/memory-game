export type gameConfigType = {
	theme: string,
	players: string,
	gridSize: string
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
	onSaveGameConfig: (gameConfig: gameConfigType, screen: string) => void
}

export type GameScreenProps = gameConfigType & {

};

export type GridProps = {
	
};
