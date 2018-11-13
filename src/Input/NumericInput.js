import React from 'react';
import PropTypes from 'prop-types';

import { to_step, cycle, clamp, valid_float } from '../util/math';
import { noop } from '../util/functions';
import TextInput from './TextInput';
import NumericInputControls from './NumericInputControls';

class NumericInput extends React.PureComponent {
	static getDerivedStateFromProps(props, current_state) {
		if (props.value !== current_state.prev_prop_value) {
			return {
				value: props.value,
				prev_prop_value: props.value
			};
		}
		return null;
	}

	constructor(props) {
		super(props);

		this.change = this.change.bind(this);
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this.format_user_input = this.format_user_input.bind(this);

		this.state = {};
	}

	change(value) {
		this.setState({ value: this.format_user_input(value) });
	}

	componentDidUpdate() {
		if (this.state.value !== this.props.value) {
			this.props.onChange(this.state.value, this.props.property);
		}
	}

	format_user_input(value) {
		return this.format_value(parseFloat(value));
	}

	format_value(value, method = clamp) {
		return to_step(
			method(value, this.props.start, this.props.end),
			this.props.step,
			this.props.precision
		);
	}

	render() {
		let { autofocus, className, tabIndex, onStart, onEnd, title } = this.props;

		let { value } = this.state;

		return (
			<TextInput
				className={`uix-input--numeric ${className || ''}`}
				tabIndex={tabIndex}
				valid={valid_float}
				format={this.format_user_input}
				value={value}
				onChange={this.change}
				onPrev={this.decrease}
				onNext={this.increase}
				onStart={onStart}
				onEnd={onEnd}
				autofocus={autofocus}
				title={title}
			>
				{React.Children.map(this.props.children, child => {
					if (child.type === NumericInputControls) {
						return React.cloneElement(child, {
							increase: this.increase,
							decrease: this.decrease,
							start: onStart,
							end: onEnd
						});
					}
					return React.cloneElement(child);
				})}
			</TextInput>
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
		this.setState(current_state => {
			let base_value =
				current_state.value !== undefined ? current_state.value : this.props.start;

			let value = this.format_value(base_value + amount, this.props.cyclical ? cycle : clamp);

			// Avoid unnecessary renders
			// when value has not actually changed
			return value !== current_state.value
				? {
						value: value
				  }
				: null;
		});
	}

	step_amount(e) {
		return (
			(typeof this.props.increment === 'function'
				? this.props.increment(e)
				: this.props.increment) || this.props.step
		);
	}
}

NumericInput.propTypes = {
	tabIndex: PropTypes.number,
	className: PropTypes.string,
	autofocus: PropTypes.bool.isRequired,
	property: PropTypes.string,
	cyclical: PropTypes.bool.isRequired,
	step: PropTypes.number.isRequired,
	precision: PropTypes.number.isRequired,
	increment: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
	start: PropTypes.number.isRequired,
	end: PropTypes.number.isRequired,
	value: PropTypes.number,
	onChange: PropTypes.func,
	onStart: PropTypes.func,
	onEnd: PropTypes.func
};

NumericInput.defaultProps = {
	tabIndex: 0,
	autofocus: false,
	cyclical: false,
	step: 1,
	precision: 0,
	increment: e => (e ? (e.shiftKey ? 10 : 1) : undefined),
	start: 0,
	end: 100,
	onChange: noop,
	onStart: noop,
	onEnd: noop
};

export default NumericInput;
