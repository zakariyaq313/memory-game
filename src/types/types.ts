export type gameConfigType = {
    id: string,
	label: string,
	group: string,
	checked: boolean
};

export type RadioInputProps = gameConfigType & {
	onUpdateGameConfig: (group: string, id: string) => void
};
