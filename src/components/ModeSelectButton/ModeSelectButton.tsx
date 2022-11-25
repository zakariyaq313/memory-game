import React, { useRef } from "react";
import { GameModeOptionType } from "../../types/types";
import "./ModeSelectButton.scss";

type Props = GameModeOptionType & {
	onUpdateGameMode: (group: string, value: string) => void
};

function ModeSelectButton(props: Props): JSX.Element {
	const {value, label, groupName, isChecked, onUpdateGameMode} = props;
	const inputRef = useRef<HTMLInputElement>(null);

	const updateGameMode = () => {
		onUpdateGameMode(groupName, value);
	}

	const triggerInputChange = (e: React.MouseEvent) => {
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

			<button onClick={(e) => triggerInputChange(e)} className="option-button">
				{label}
			</button>
		</div>
	);
}

export default ModeSelectButton;
