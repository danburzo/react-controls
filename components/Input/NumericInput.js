import React from 'react';
import { to_step, cycle, clamp, valid_float } from '../util/math';
import { noop } from '../util/functions';

import TextInput from './TextInput';
import NumericInputControls from './NumericInputControls';

class NumericInput extends React.PureComponent {

	constructor(props) {

		super(props);

		this.change = this.change.bind(this);
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this.format_user_input = this.format_user_input.bind(this);

		this.state = {};
	}

	change(value) {
		this.props.onChange(this.format_user_input(value), this.props.property);
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

		let {
			autofocus,
			className,
			tabIndex,
			onStart,
			onEnd,
			title,
			value
		} = this.props;

		return (
				<TextInput
					className={ `uix-input--numeric ${ className || '' }` }
					tabIndex={ tabIndex }
					valid={ valid_float }
					format={ this.format_user_input }
					value={ value }
					onChange={ this.change }
					onPrev={ this.decrease }
					onNext={ this.increase }
					onStart={ onStart }
					onEnd={ onEnd }
					autofocus={ autofocus }
					title={ title }
				>
					{
						React.Children.map(
							this.props.children,
							child => {
								if (child.type === NumericInputControls) {
									return React.cloneElement(child, {
										increase: this.increase,
										decrease: this.decrease,
										start: onStart,
										end: onEnd
									});
								}
								return React.cloneElement(child)
							}
						)
					}
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
		this.props.onChange(
			this.format_value(
				(this.props.value !== undefined ? this.props.value : this.props.start) + amount, 
				this.props.cyclical ? cycle : clamp
			),
			this.props.property
		);
	}

	step_amount(e) {
		return (
			typeof this.props.increment === 'function' ? 
				this.props.increment(e) : this.props.increment
		) || this.props.step;
	}
}

NumericInput.defaultProps = {
	tabIndex: 0,
	className: undefined,
	autofocus: false,
	property: undefined,
	cyclical: false,
	step: 1,
	precision: 0,
	increment: e => e ? (e.shiftKey ? 10 : 1) : undefined,
	start: 0,
	end: 100,
	value: undefined,
	onChange: noop,
	onStart: noop,
	onEnd: noop
};

export default NumericInput;