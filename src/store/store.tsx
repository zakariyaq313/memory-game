import { RadioInputType } from '../types/types';
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

export const icons: JSX.Element[] = [
	<Cat />,
	<Dragon />,
	<Flask />,
	<Infinite />,
	<Masks />,
	<Snowflake />,
	<GameController />,
	<Dice />,
	<Fork />,
	<Ghost />,
	<Shark />,
	<Shield />,
	<Cake />,
	<Duck />,
	<Lemon />,
	<Plane />,
	<Robot />,
	<Skull />
];

export const numbers: number[] = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
];
