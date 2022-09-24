import React, { useRef } from "react";
import { RadioInputProps } from './../types/types';
import "../sass/radio-input/radio-input.scss";

function RadioInput(props: RadioInputProps): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null);

	const updateGameConfig = () => {
		props.onUpdateGameConfig(props.group, props.id);
	}

	const buttonHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		inputRef.current?.click();
	}
	return (
		<React.Fragment>
			<input type="radio"
				id={props.id}
				name={props.group}
				value={props.id}
				checked={props.checked}
				ref={inputRef}
				onChange={updateGameConfig} />
			<label htmlFor={props.id}>
				<button onClick={(e) => buttonHandler(e)}>
					{props.label}
				</button>
			</label>
		</React.Fragment>
	);
}

export default RadioInput;