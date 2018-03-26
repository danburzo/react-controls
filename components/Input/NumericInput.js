import React from 'react';

import { to_step, cycle, clamp, parse_expression, parse_float, valid_float } from '../util/math';
import { noop } from '../util/functions';

import { TextInput } from './';


class NumericInput extends React.PureComponent {

	constructor(props) {

		super(props);

		this.change = this.change.bind(this);
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
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

	componentDidUpdate() {
		if (this.state.value !== this.props.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
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
		return this.format_value(value);
	}
 
	render() {

		let {
			type,
			autofocus,
			className,
			onStart,
			onEnd
		} = this.props;

		let {
			value
		} = this.state;

		return (
			<div className={`uix-input uix-input--numeric ${className || ''}`}>
				<TextInput
					valid={valid_float}
					format={this.format_user_input}
					value={value}
					onChange={this.change}
					onPrev={this.decrease}
					onNext={this.increase}
					onStart={onStart}
					onEnd={onEnd}
					autofocus={autofocus}
				/>
				{
					React.Children.map(
						this.props.children,
						child => React.cloneElement(child, {
							increase: this.increase,
							decrease: this.decrease,
							start: onStart,
							end: onEnd
						})
					)
				}
			</div>
		);
	}

	increase(e) {
		this.offset(e, 1);
	}

	decrease(e) {
		this.offset(e, -1);
	}

	offset(e, dir) {
		let amount = this.step_amount(e) * dir * Math.sign(this.props.end - this.props.start);
		this.setState(
			current_state => {

				let value = this.format_value(
					(
						current_state.value !== undefined ? 
							current_state.value : this.props.start
					) + amount, 
					this.props.cyclical ? cycle : clamp
				);

				// Avoid unnecessary renders 
				// when value has not actually changed
				return value !== current_state.value ? {
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