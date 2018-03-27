import React from 'react';

import { noop, returnTrue, invariant } from '../util/functions';

class TextInput extends React.Component {

	constructor(props) {

		super(props);

		this.change = this.change.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.register = this.register.bind(this);
		this.commit = this.commit.bind(this);

		this.state = {
			value: this.props.value,
			formatted_value: this.props.format(this.props.value),
			transient_value: this.props.value
		};
	}

	componentWillReceiveProps({ value }) {
		if (value !== this.state.formatted_value) {
			this.setState({
				value: value,
				formatted_value: this.props.format(value),
				transient_value: value
			});
		}
	}

	componentDidUpdate(previous_props, previous_state) {
		if (this.state.value === previous_state.value) {
			return;
		}
		if (this.state.value !== this.props.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
	}

	change(e) {
		let input_value = e.target.value;
		let state = { transient_value: input_value };
		if (this.props.valid(input_value)) {
			state['value'] = input_value;
			state['formatted_value'] = this.props.format(input_value);
		}
		this.setState(state);
	}

	handleKeys(e) {
		let handled = true;
		switch (e.key) {
			case 'Enter':
				this.commit(e);
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

	commit(e) {
		this.setState(
			current_state => {
				return current_state.transient_value !== current_state.formatted_value ? 
					{ transient_value: current_state.formatted_value } : null;
			}, 
			() => this.props.onEnd(e)
		);
	}

	register(input) {
		input && this.props.autofocus && input.focus();
	}

	render() {

		let {
			className,
			tabIndex
		} = this.props;

		let {
			transient_value
		} = this.state;

		return (
			<div className={ `uix-input ${ className || '' }` }>
				<input
					tabIndex={ tabIndex }
					value={ transient_value === undefined ? '' : transient_value }
					onChange={ this.change }
					onKeyDown={ this.handleKeys }
					onFocus={ this.props.onStart }
					onBlur={ this.commit }
					ref={ this.register } 
				/>
				{ this.props.children }
			</div>
		);
	}
}

TextInput.defaultProps = {
	tabIndex: 0,
	className: undefined,

	onChange: noop,
	onStart: noop,
	onEnd: noop,
	onPrev: noop,
	onNext: noop,

	valid: returnTrue,
	format: invariant
	
};

export default TextInput;