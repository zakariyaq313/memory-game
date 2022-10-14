import React, { useRef } from "react";
import { RadioInputProps } from './../types/types';
import "../sass/radio-input/radio-input.scss";

function RadioInput(props: RadioInputProps): JSX.Element {
	const {value, label, groupName, isChecked, onUpdateGameConfig} = props;
	const inputRef = useRef<HTMLInputElement>(null);

	const updateGameConfig = () => {
		onUpdateGameConfig(groupName, value);
	}

	const buttonHandler = (e: React.MouseEvent) => {
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
				onChange={updateGameConfig}
			/>

			<button onClick={(e) => buttonHandler(e)} className="option-button">
				{label}
			</button>
		</div>
	);
}

export default RadioInput;
