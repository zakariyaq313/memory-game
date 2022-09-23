import { gameConfigType } from './../types/types';

export const gameConfigOptions: Array<gameConfigType[]> = [
	[
		{
			id: "numbers",
			label: "Numbers",
			group: "theme",
			checked: true
		},
		{
			id: "icons",
			label: "Icons",
			group: "theme",
			checked: false
		}
	],
	[
		{
			id: "one",
			label: "One",
			group: "players",
			checked: true
		},
		{
			id: "two",
			label: "Two",
			group: "players",
			checked: false
		},
		{
			id: "three",
			label: "Three",
			group: "players",
			checked: false
		},
		{
			id: "four",
			label: "Four",
			group: "players",
			checked: false
		}
	],
	[
		{
			id: "fourTiles",
			label: "4 x 4",
			group: "gridSize",
			checked: true
		},
		{
			id: "sixTiles",
			label: "6 x 6",
			group: "gridSize",
			checked: false
		}
	]
];
