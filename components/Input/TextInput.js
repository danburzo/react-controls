import React from 'react';

import { noop, returnTrue, invariant } from '../util/functions';

class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);

		this.state = {
			focused: false,
			value: props.value,
			transient_value: typeof props.value !== undefined ? props.value : ''
		};
	}

	componentWillReceiveProps({ value }) {
		if (value !== this.state.value) {
			this.setState({
				value: value,
				transient_value: typeof value !== undefined ? value : ''
			})
		}
	}

	componentDidUpdate(old_props, old_state) {
		if (this.state.value !== old_state.value && this.state.value !== this.props.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
	}

	change(e) {
		let input_value = e.target.value;
		let is_valid = this.props.valid(input_value);
		this.setState(
			is_valid ? 
				{
					transient_value: input_value,
					value: this.props.format(input_value)
				}
				:
				{
					transient_value: input_value
				}
		);
	}

	handleKeys(e) {
		let handled = true;
		switch (e.key) {
			case 'Enter':
				this.props.onChange(this.state.value, this.props.property);
				break;
			case 'ArrowUp':
				this.props.onNext(e);
				break;
			case 'ArrowDown':
				this.props.onPrev(e);
				break;
			default:
				handled = false;
		}
		if (handled) {
			e.preventDefault();
		}
	}

	focus(e) {
		this.setState({
			focused: true
		}, () => {
			this.start(e);
		})
	}

	blur(e) {
		this.setState({
			focused: false
		});
	}

	start(e) {
		this.props.onStart(e);
	}

	end(e) {
		this.props.onEnd(e);
	}

	render() {

		let {
			transient_value
		} = this.state;

		return (
			<input
				value={transient_value}
				onChange={this.change}
				onKeyDown={this.handleKeys}
				onFocus={this.focus}
				onBlur={this.blur}
			/>
		);
	}
}

TextInput.defaultProps = {
	onStart: noop,
	onEnd: noop,
	onPrev: noop,
	onNext: noop,
	valid: returnTrue,
	format: invariant,
	onChange: noop
};

export default TextInput;