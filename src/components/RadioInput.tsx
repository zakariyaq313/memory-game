import React from "react";
import { RadioInputProps } from './../types/types';

function RadioInput(props: RadioInputProps): JSX.Element {
	const updateGameConfig = () => {
		props.onUpdateGameConfig(props.group, props.id);
	}
	return (
		<React.Fragment>
			<input type="radio"
				id={props.id}
				name={props.group}
				value={props.id}
				checked={props.checked}
				onChange={updateGameConfig} />
			<label htmlFor={props.id}>
				<button>
					{props.label}
				</button>
			</label>
		</React.Fragment>
	);
}

export default RadioInput;