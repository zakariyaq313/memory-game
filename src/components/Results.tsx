import { useState } from "react";
import { ResultProps } from "../types/types";

function Results(props: ResultProps): JSX.Element {
	const [highScore, setHighScore] = useState(0);

	return (
		<div className="result">
			{props.numberOfPlayers === 1 &&
				<h1>
					Moves needed: {props.movesNeeded},
					Time needed: {props.timeNeeded.minutes}:{props.timeNeeded.seconds}
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
