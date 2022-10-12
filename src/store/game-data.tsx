import { IconTileType, NumberTileType, RadioInputType } from '../types/types';
import Boat from '../icons/Boat';
import CableCar from '../icons/CableCar';
import Cake from '../icons/Cake';
import Cat from "../icons/Cat";
import Cone from '../icons/Cone';
import Dice from '../icons/Dice';
import Dragon from "../icons/Dragon";
import Flask from "../icons/Flask";
import Fork from "../icons/Fork";
import Fox from '../icons/Fox';
import GameController from '../icons/GameController';
import Ghost from "../icons/Ghost";
import Infinite from "../icons/Infinite";
import Lemon from '../icons/Lemon';
import Masks from "../icons/Masks";
import Snowflake from "../icons/Snowflake";
import Television from '../icons/Television';
import Umbrella from '../icons/Umbrella';

export const gameConfigOptions: Array<RadioInputType[]> = [
	[
		{
			id: "icons",
			label: "Icons",
			group: "gameTheme",
			checked: true
		},
		{
			id: "numbers",
			label: "Numbers",
			group: "gameTheme",
			checked: false
		}
	],
	[
		{
			id: "one",
			label: "One",
			group: "numberOfPlayers",
			checked: true
		},
		{
			id: "two",
			label: "Two",
			group: "numberOfPlayers",
			checked: false
		},
		{
			id: "three",
			label: "Three",
			group: "numberOfPlayers",
			checked: false
		},
		{
			id: "four",
			label: "Four",
			group: "numberOfPlayers",
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

export const icons: IconTileType[] = [
	{
		id: "cat",
		tile: <Cat />
	},
	{
		id: "cake",
		tile: <Cake />
	},
	{
		id: "dragon",
		tile: <Dragon />
	},
	{
		id: "infinite",
		tile: <Infinite />
	},
	{
		id: "television",
		tile: <Television />
	},
	{
		id: "flask",
		tile: <Flask />
	},
	{
		id: "masks",
		tile: <Masks />
	},
	{
		id: "fox",
		tile: <Fox />
	},
	{
		id: "cable",
		tile: <CableCar />
	},
	{
		id: "fork",
		tile: <Fork />
	},
	{
		id: "lemon",
		tile: <Lemon />
	},
	{
		id: "snowflake",
		tile: <Snowflake />
	},
	{
		id: "dice",
		tile: <Dice />
	},
	{
		id: "cone",
		tile: <Cone />
	},
	{
		id: "umbrella",
		tile: <Umbrella />
	},
	{
		id: "boat",
		tile: <Boat />
	},
	{
		id: "console",
		tile: <GameController />
	},
	{
		id: "ghost",
		tile: <Ghost />
	}
];

export const numbers: NumberTileType[] = [
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
