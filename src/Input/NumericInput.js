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

	// Don't format user input if it's not defined (so we don't end up with NaN)
	format_user_input(value) {
		return value ? this.format_value(parseFloat(value)) : value;
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
		e.stopPropagation();
		const input = e.target;
		let amount = this.step_amount(e) * dir * Math.sign(this.props.end - this.props.start);
		this.setState(
			current_state => {
				let base_value =
					current_state.value !== undefined ? current_state.value : this.props.start;

				let value = this.format_value(
					base_value + amount,
					this.props.cyclical ? cycle : clamp
				);

				// Avoid unnecessary renders
				// when value has not actually changed
				return value !== current_state.value
					? {
							value: value
					  }
					: null;
			},
			() => {
				if (this.props.focusOnUpdate) {
					input.focus();
				}
			}
		);
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
	/**
	 * The component's tab index.
	 */
	tabIndex: PropTypes.number,

	/**
	 * Any additional class names to pass to the component.
	 */
	className: PropTypes.string,

	/**
	 * Whether the component should autofocus when it's mounted in the DOM.
	 */
	autofocus: PropTypes.bool.isRequired,

	/**
	 * An optional identifier to pass along to the callback functions.
	 */
	property: PropTypes.any,

	/**
	 * Whether the input should cycle the value when reaching the interval edges.
	 */
	cyclical: PropTypes.bool.isRequired,

	/**
	 * The step to use when changing the value with the Up / Down arrow keys.
	 * For steps that are fractions, always use an appropriate `precision`
	 * as well, to avoid floating-point errors.
	 */
	step: PropTypes.number.isRequired,

	/**
	 * The number of decimals to round the value to.
	 */
	precision: PropTypes.number.isRequired,

	/**
	 *
	 */
	increment: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),

	/**
	 * The _starting value_ for the range.
	 */
	start: PropTypes.number.isRequired,

	/**
	 * The _end value_ for the range.
	 * It's not necessary to have `start < end`,
	 * as the NumericInput works well even with inverted ranges.
	 */
	end: PropTypes.number.isRequired,

	/**
	 * The input's initial value.
	 * Whenever the component receives a new value from its parent,
	 * it will reset the component's inner state to match that value.
	 */
	value: PropTypes.number,

	/**
	 * When the `property` prop is set, it will be passed back as the second argument.
	 */
	onChange: PropTypes.func,

	/**
	 * When the `property` prop is set, it will be passed back as the second argument.
	 */
	onStart: PropTypes.func,

	/**
	 * When the `property` prop is set, it will be passed back as the second argument.
	 */
	onEnd: PropTypes.func,

	/**
	 * Focus the input element after state was updated
	 */
	focusOnUpdate: PropTypes.bool
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
	onEnd: noop,
	focusOnUpdate: false
};

export default NumericInput;
