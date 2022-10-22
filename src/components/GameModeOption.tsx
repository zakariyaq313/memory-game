import React, { useRef } from "react";
import { GameModeOptionProps } from '../types/types';
import "../sass/game-mode-option/game-mode-option.scss";

function GameModeOption(props: GameModeOptionProps): JSX.Element {
	const {value, label, groupName, isChecked, onUpdateGameMode} = props;
	const inputRef = useRef<HTMLInputElement>(null);

	const updateGameMode = () => {
		onUpdateGameMode(groupName, value);
	}

	const triggerInputCheck = (e: React.MouseEvent) => {
		e.preventDefault();
		inputRef.current?.click();
	}
	return (
		<div className="option-selector">
			<input type="radio"
				name={groupName}
				value={value}
				checked={isChecked}
				ref={inputRef}
				onChange={updateGameMode}
			/>

			<button onClick={(e) => triggerInputCheck(e)} className="option-button">
				{label}
			</button>
		</div>
	);
}

export default GameModeOption;
