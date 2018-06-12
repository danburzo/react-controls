import React from 'react';
import { formatter as culoriFormatter  } from 'culori';

import { noop } from '../util/functions';

import TextInput from './TextInput';

const fmt = (value, format) => culoriFormatter(format)(value);

class ColorTextInput extends React.PureComponent {

	static getDerivedStateFromProps(props, current_state) {
		return {
			value: fmt(props.value, props.format)
		};
	}
	
	constructor(props) {
		super(props);
		this.format_color = this.format_color.bind(this);
		this.state = {};
	}

	format_color(value) {
		return fmt(value, this.props.format);
	}

	render() {
		return (
			<TextInput
				value={this.state.value}
				valid={this.format_color}
				format={this.format_color}
				onChange={this.props.onChange}
			/>
		);
	}
}

ColorTextInput.defaultProps = {
	format: 'hex',
	onChange: noop
};

export default ColorTextInput;
