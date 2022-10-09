import { useEffect, useState } from "react";
import { ResultProps } from "../types/types";
import "../sass/results/results.scss";

function Results(props: ResultProps): JSX.Element {
	const {numberOfPlayers, movesNeeded, timeNeeded, playerData} = props;
	const [highScore, setHighScore] = useState(0);
	
	useEffect(() => {
		if (numberOfPlayers > 1) {
			for (const player of playerData) {
				if (player.score > highScore) {
					setHighScore(player.score);
				}
			}
		}
	}, [numberOfPlayers, playerData, highScore]);

	return (
		<div className="result">
			{props.numberOfPlayers === 1 &&
				<h1>
					Moves needed: {movesNeeded},
					Time needed: {timeNeeded.minutes}:{timeNeeded.seconds}
				</h1>
			}
			{props.numberOfPlayers > 1 &&
				<h1>
					High score yet to be decided
				</h1>
			}
		</div>
	);
}

export default Results;
