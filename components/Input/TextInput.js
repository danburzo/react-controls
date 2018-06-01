import React from 'react';

import { noop, returnTrue, identity } from '../util/functions';

class TextInput extends React.Component {

	static getDerivedStateFromProps(props, current_state) {
		if (props.value !== current_state.previous_value) {
			return {
				previous_value: props.value,
				value: props.format(props.value)
			}
		}
		return null;
	}

	constructor(props) {
		
		super(props);

		this.start = this.start.bind(this);
		this.change = this.change.bind(this);
		this.end = this.end.bind(this);

		this.handleKeys = this.handleKeys.bind(this);
		this.register = this.register.bind(this);

		this.state = {};
	}

	start(e) {
		this.setState({
			interacting: true
		}, () => {
			this.props.onStart(e);
		});
	}

	end(e) {
		this.setState({
			interacting: false
		}, () => {
			this.props.onEnd(e);
		});
	}

	broadcast(value) {
		if (value !== this.props.value) {
			this.props.onChange(value, this.props.property);
		}
	}

	commit(e) {
		this.setState({
			value: this.props.format(this.props.value)
		});
	}

	change(e) {
		let input_value = e.target.value;
		this.setState({
			value: input_value
		});
		if (this.props.valid(input_value)) {
			this.broadcast(input_value);
		}
	}

	render() {

		let {
			className,
			tabIndex,
			title
		} = this.props;

		let {
			value
		} = this.state;

		return (
			<div className={ `uix-input ${ className || '' }` }>
				<input
					tabIndex={ tabIndex }
					value={ value === undefined ? '' : value }
					onChange={ this.change }
					onKeyDown={ this.handleKeys }
					onFocus={ this.start }
					onBlur={ this.end }
					ref={ this.register } 
					title={ title }
				/>
				{ this.props.children }
			</div>
		);
	}

	// Keyboard shortcuts
	// -----------------------------------------

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

	// Autofocus
	// -----------------------------------------

	register(input) {
		input && this.props.autofocus && input.focus();
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

export default TextInput;