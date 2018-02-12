import React from 'react';

import { scaleLinear } from 'd3-scale';

import { to_step, clamp } from '../util/numbers';

const initial_state = {
	transient_value: null
};

class NumericInput extends React.PureComponent {
	
	constructor(props) {

		super(props);

		this.onKeyDown = this.onKeyDown.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);

		this.register = this.register.bind(this);

		this.state = {
			...initial_state,
			transient_value: props.value
		};

	}

	componentWillReceiveProps(props) {

		this.setState({
			transient_value: props.value
		});

	}

	onKeyDown(e) {
		let handled = true;
		switch (e.key) {
			case 'ArrowUp':
				this.offset(e, 1);
				break;
			case 'ArrowDown':
				this.offset(e, -1);
				break;
			case 'Enter':
				this.commit();
			default:
				handled = false;
		}

		if (handled) {
			e.preventDefault();
		}
	}

	onBlur(e) {

	}

	offset(e, dir) {

		let amount = this.step_amount(e);

		this.commit(() => {
			this.setState(
				previous_state => {
					
					let proposed_value = previous_state.transient_value
						+ amount * dir * Math.sign(this.props.end - this.props.start);

					return {
						transient_value: this.format_value(proposed_value, this.props.step)
					}
				},
				() => {
					this.commit();
				}
			);
		});
	}

	onChange(e) {
		this.setState({
			transient_value: e.target.value
		});
	}

	step_amount(e) {
		return this.props.increment === undefined ? 
			this.props.step : 
			typeof this.props.increment === 'function' ?
				this.props.increment(e) : 
				this.props.increment;
	}

	format_value(value, increment) {
		return to_step(
			clamp(value, this.props.start, this.props.end),
			increment || this.props.step, 
			this.props.precision,
			'floor'
		);
	}

	commit(callback) {
		let value = parseFloat(this.state.transient_value);
		let proposed_value;

		if (!isNaN(value) && isFinite(value)) {
			proposed_value = this.format_value(value);
		} else {
			proposed_value = this.props.value;
		}

		this.setState(
			{
				transient_value: proposed_value
			}, 
			() => {
				this.props.onChange(this.state.transient_value);
				if (callback) {
					callback();
				}
			}
		);
	}

	register(input) {
		if (input) {
			this.input = input;
			if (this.props.autofocus) {
				this.input.focus();
			}
		} else {
			this.input = null;
		}
	}

	render() {

		let {
			type,
			autofocus
		} = this.props;

		let {
			transient_value
		} = this.state;

		return (
			<input
				ref={this.register}
				className='rc-input rc-input--numeric'
				onKeyDown={this.onKeyDown}
				onBlur={this.onBlur}	
				onChange={this.onChange}
				type={type}
				value={transient_value}
			/>
		);
	}
}

NumericInput.defaultProps = {
	type: 'text',
	autofocus: false,
	step: 1,
	precision: 0,
	increment: (e) => e ? (e.shiftKey ? 10 : 1) : undefined,
	start: 0,
	end: 100,
	value: 0,
	onChange: value => {}
};

export default NumericInput;