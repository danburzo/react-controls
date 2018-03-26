import React from 'react';

import { to_step, cycle, clamp, parse_expression, parse_float } from '../util/math';
import { noop } from '../util/functions';

import { TextInput } from './';


class NumericInput extends React.PureComponent {

	constructor(props) {

		super(props);

		this.change = this.change.bind(this);
		this.end = this.end.bind(this);
		this.start = this.start.bind(this);
		this.register = this.register.bind(this);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this.format_user_input = this.format_user_input.bind(this);

		this.state = {
			value: props.value
		};

	}

	componentWillReceiveProps({ value }) {
		this.setState({ value });
	}

	change(value) {
		this.setState({ value });
	}

	start(e) {
		this.props.onStart(e);
	}

	end(e) {
		this.props.onEnd(e);
	}

	componentDidUpdate(prev_props, prev_state) {
		this.props.onChange(this.state.value, this.props.property);
	}

	format_value(value, method = clamp) {
		return to_step(
			method(value, this.props.start, this.props.end),
			this.props.step, 
			this.props.precision
		);
	}

	format_user_input(proposed_value) {
		let value = this.props.parse_value(proposed_value);

		if (!isNaN(value) && isFinite(value)) {
			return this.format_value(value);
		} else {
			return this.props.value;
		}
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
			autofocus,
			controls,
			className
		} = this.props;

		let {
			value
		} = this.state;

		return (
			<div className={`uix-input uix-input--numeric ${className || ''}`}>
				<TextInput
					valid={
						value => {
							let num = parseFloat((value + '').trim());
							return !isNaN(num) && isFinite(num);
						}
					}
					format={this.format_user_input}
					value={value}
					onChange={this.change}
					onPrev={this.decrement}
					onNext={this.increment}
					onStart={this.start}
					onEnd={this.end}
				/>
				{
					React.Children.map(
						this.props.children,
						child => React.cloneElement(child, {
							increment: this.increment,
							decrement: this.decrement,
							end: this.end,
							start: this.start
						})
					)
				}
			</div>
		);
	}

	/*
		Keyboard handling
		-----------------------------------------------------------
	*/


	increment(e) {
		this.offset(e, 1);
	}

	decrement(e) {
		this.offset(e, -1);
	}

	offset(e, dir) {
		let amount = this.step_amount(e) * dir * Math.sign(this.props.end - this.props.start);
		this.setState(
			current_state => {

				let current_value = this.format_user_input(current_state.value);

				let value = this.format_value(
					(current_value === undefined ? this.props.start : current_value) + amount, 
					this.props.cyclical ? cycle : clamp
				);

				// Avoid unnecessary renders 
				// when value has not actually changed
				return value !== current_state.value ? {
					transient_value: value,
					value: value
				} : null;
			}
		);
	}

	step_amount(e) {
		return (
			typeof this.props.increment === 'function' ? 
				this.props.increment(e) : this.props.increment
		) || this.props.step;
	}

}

const increment_bigger_step_on_shift = e => e ? (e.shiftKey ? 10 : 1) : undefined;

NumericInput.defaultProps = {
	type: 'text',
	autofocus: false,
	step: 1,
	precision: 0,
	increment: increment_bigger_step_on_shift,
	start: 0,
	end: 100,
	value: '',
	onChange: noop,
	onStart: noop,
	onEnd: noop,
	property: undefined,
	expressions: true,
	parse_value: parse_float,
	cyclical: false,
	className: undefined
};

export default NumericInput;