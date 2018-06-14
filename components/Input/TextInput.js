import React from 'react';
import PropTypes from 'prop-types';

import { noop, returnTrue, identity } from '../util/functions';
import './Input.css';

class TextInput extends React.Component {

	static getDerivedStateFromProps(props, current_state) {
		if (props.value !== current_state.prev_prop_value) {
			return {
				value: props.value,
				prev_prop_value: props.value,
				formatted_value: props.format(props.value),
				transient_value: props.value
			};
		}
		return null;
	}

	constructor(props) {

		super(props);

		this.change = this.change.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.register = this.register.bind(this);
		this.commit = this.commit.bind(this);

		this.state = {};

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
		let state = { 
			transient_value: input_value,
			prev_prop_value: this.state.prev_prop_value
		};
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
			tabIndex,
			title
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
					title={ title }
				/>
				{ this.props.children }
			</div>
		);
	}
}

TextInput.defaultProps = {

	tabIndex: 0,
	className: undefined,
	autofocus: false,
	property: undefined,

	value: undefined,

	onChange: noop,
	onStart: noop,
	onEnd: noop,
	onPrev: noop,
	onNext: noop,

	valid: returnTrue,
	format: identity
	
};

TextInput.propTypes = {
	
}

export default TextInput;