import { GameConfigType, TileType } from '../types/types';
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
import { createNumberTiles } from '../helper-functions/helper-functions';

export const gameConfig: GameConfigType[] = [
	{
		title: "Select Theme",
		options: [
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
		]
	},
	{
		title: "Number Of Players",
		options: [
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
		]
	},
	{
		title: "Grid Size",
		options: [
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
	}
];

export const numberTilesCollection = createNumberTiles(18);
export const iconTilesCollection: TileType[] = [
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
