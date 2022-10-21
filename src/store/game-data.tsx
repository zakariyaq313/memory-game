import { IconTileType, NumberTileType, RadioInputType } from '../types/types';
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
import Leaf from '../icons/Leaf';
import Lemon from '../icons/Lemon';
import Masks from "../icons/Masks";
import Money from '../icons/Money';
import Snowflake from "../icons/Snowflake";
import Television from '../icons/Television';
import Umbrella from '../icons/Umbrella';

export const gameConfigOptions: Array<(string | RadioInputType)[]> = [
	[
		"Select Theme",
		{
			value: "icons",
			label: "Icons",
			groupName: "gameTheme",
			isChecked: true
		},
		{
			value: "numbers",
			label: "Numbers",
			groupName: "gameTheme",
			isChecked: false
		}
	],
	[
		"Number Of Players",
		{
			value: "1",
			label: "1",
			groupName: "numberOfPlayers",
			isChecked: true
		},
		{
			value: "2",
			label: "2",
			groupName: "numberOfPlayers",
			isChecked: false
		},
		{
			value: "3",
			label: "3",
			groupName: "numberOfPlayers",
			isChecked: false
		},
		{
			value: "4",
			label: "4",
			groupName: "numberOfPlayers",
			isChecked: false
		}
	],
	[
		"Grid Size",
		{
			value: "four",
			label: "4 x 4",
			groupName: "gridSize",
			isChecked: true
		},
		{
			value: "six",
			label: "6 x 6",
			groupName: "gridSize",
			isChecked: false
		}
	]
];

export const iconTilesCollection: IconTileType[] = [
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
		id: "snowflake",
		tile: <Snowflake />
	},
	{
		id: "fox",
		tile: <Fox />
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
		id: "leaf",
		tile: <Leaf />
	},
	{
		id: "money",
		tile: <Money />
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
		id: "console",
		tile: <GameController />
	},
	{
		id: "ghost",
		tile: <Ghost />
	}
];

export const numberTilesCollection: NumberTileType[] = [
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
