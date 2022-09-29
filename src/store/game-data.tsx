import { IconType, NumberType, RadioInputType } from '../types/types';
import Cat from "../icons/Cat";
import Dragon from "../icons/Dragon";
import Flask from "../icons/Flask";
import Fork from "../icons/Fork";
import Ghost from "../icons/Ghost";
import Infinite from "../icons/Infinite";
import Masks from "../icons/Masks";
import Shark from "../icons/Shark";
import Snowflake from "../icons/Snowflake";
import GameController from '../icons/GameController';
import Dice from '../icons/Dice';
import Shield from '../icons/Shield';
import Cake from '../icons/Cake';
import Duck from '../icons/Duck';
import Lemon from '../icons/Lemon';
import Plane from '../icons/Plane';
import Robot from '../icons/Robot';
import Skull from '../icons/Skull';

export const gameConfigOptions: Array<RadioInputType[]> = [
	[
		{
			id: "icons",
			label: "Icons",
			group: "theme",
			checked: true
		},
		{
			id: "numbers",
			label: "Numbers",
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

export const icons: IconType[] = [
	{
		id: "cat",
		tile: <Cat />
	},
	{
		id: "dragon",
		tile: <Dragon />
	},
	{
		id: "flask",
		tile: <Flask />
	},
	{
		id: "cake",
		tile: <Cake />
	},
	{
		id: "infinite",
		tile: <Infinite />
	},
	{
		id: "masks",
		tile: <Masks />
	},
	{
		id: "lemon",
		tile: <Lemon />
	},
	{
		id: "skull",
		tile: <Skull />
	},
	{
		id: "plane",
		tile: <Plane />
	},
	{
		id: "dice",
		tile: <Dice />
	},
	{
		id: "fork",
		tile: <Fork />
	},
	{
		id: "snowflake",
		tile: <Snowflake />
	},
	{
		id: "console",
		tile: <GameController />
	},
	{
		id: "ghost",
		tile: <Ghost />
	},
	{
		id: "shark",
		tile: <Shark />
	},
	{
		id: "shield",
		tile: <Shield />
	},
	{
		id: "duck",
		tile: <Duck />
	},
	{
		id: "robot",
		tile: <Robot />
	}
];

export const numbers: NumberType[] = [
	{
		id: "one",
		tile: 1
	},
	{
		id: "two",
		tile: 2
	},
	{
		id: "three",
		tile: 3
	},
	{
		id: "four",
		tile: 4
	},
	{
		id: "five",
		tile: 5
	},
	{
		id: "six",
		tile: 6
	},
	{
		id: "seven",
		tile: 7
	},
	{
		id: "eight",
		tile: 8
	},
	{
		id: "nine",
		tile: 9
	},
	{
		id: "ten",
		tile: 10
	},
	{
		id: "eleven",
		tile: 11
	},
	{
		id: "twelve",
		tile: 12
	},
	{
		id: "thirteen",
		tile: 13
	},
	{
		id: "fourteen",
		tile: 14
	},
	{
		id: "fifteen",
		tile: 15
	},
	{
		id: "sixteen",
		tile: 16
	},
	{
		id: "seventeen",
		tile: 17
	},
	{
		id: "eighteen",
		tile: 18
	}
];
