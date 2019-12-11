import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import { noop } from '../util/functions';
import { to_step, clamp, cycle } from '../util/math';
import Surface from '../Surface/Surface';

import './Pad.css';

const initial_state = {
	x: undefined,
	y: undefined,
	interacting: false,
	prev_prop_x: undefined,
	prev_prop_y: undefined
};

class Pad extends React.PureComponent {
	static getDerivedStateFromProps(props, current_state) {
		let state = {},
			changed = false;

		if (current_state.prev_prop_x !== props.x || current_state.prev_prop_y !== props.y) {
			state['x'] = state['prev_prop_x'] = props.x;
			state['y'] = state['prev_prop_y'] = props.y;
			changed = true;
		}

		if (current_state.x_start !== props.x_start || current_state.x_end !== props.x_end) {
			state['x_start'] = props.x_start;
			state['x_end'] = props.x_end;
			state['x_scale'] = scaleLinear()
				.domain([0, 100])
				.range([props.x_start, props.x_end])
				.clamp(true);
			changed = true;
		}

		if (current_state.y_start !== props.y_start || current_state.y_end !== props.y_end) {
			state['y_start'] = props.y_start;
			state['y_end'] = props.y_end;
			state['y_scale'] = scaleLinear()
				.domain([0, 100])
				.range([props.y_start, props.y_end])
				.clamp(true);
			changed = true;
		}

		return changed ? state : null;
	}

	constructor(props) {
		super(props);

		// Event handlers
		this.change = this.change.bind(this);
		this.keydown = this.keydown.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);

		// Initial state
		this.state = initial_state;
	}

	componentDidUpdate(prev_props, prev_state) {
		if (this.state.x !== prev_state.x || this.state.y !== prev_state.y) {
			this.props.onChange(
				{
					x: this.state.x,
					y: this.state.y
				},
				this.props.property
			);
		}
	}

	format_x(value, method = clamp) {
		return value !== undefined
			? to_step(
					method(value, this.props.x_start, this.props.x_end),
					this.props.x_step,
					this.props.x_precision
			  )
			: undefined;
	}

	format_y(value, method = clamp) {
		return value !== undefined
			? to_step(
					method(value, this.props.y_start, this.props.y_end),
					this.props.y_step,
					this.props.y_precision
			  )
			: undefined;
	}

	change({ x, y }) {
		let x_val = this.format_x(this.state.x_scale(x));
		let y_val = this.format_y(this.state.y_scale(y));

		this.setState(previous_state => {
			// Avoid unnecessary renders
			// when values have not actually changed
			return x_val === previous_state.x && y_val === previous_state.y
				? null
				: {
						x: x_val,
						y: y_val
				  };
		});
	}

	start(e) {
		e.persist();
		this.setState(
			{
				interacting: true
			},
			() => {
				this.props.onStart(e);
			}
		);
	}

	end(e) {
		this.setState(
			{
				interacting: false
			},
			() => {
				this.props.onEnd(e);
			}
		);
	}

	render() {
		let {
			cyclical,
			tabIndex,
			className,
			x_step,
			y_step,
			x_precision,
			y_precision
		} = this.props;

		let { x, y, interacting, x_scale, y_scale } = this.state;

		return (
			<div
				className={`
					uix-pad 
					${cyclical ? 'uix-pad--cyclical' : ''} 
					${interacting ? 'uix-pad--interacting' : ''} 
					${className || ''}
				`}
				tabIndex={tabIndex}
				onKeyDown={this.keydown}
			>
				<Surface onStart={this.start} onEnd={this.end} onChange={this.change}>
					{React.Children.map(this.props.children, child =>
						React.cloneElement(child, {
							x: x,
							y: y,
							x_scale: x_scale,
							y_scale: y_scale,
							x_step: x_step,
							y_step: y_step,
							x_precision: x_precision,
							y_precision: y_precision,
							interacting: interacting,
							...child.props
						})
					)}
				</Surface>
			</div>
		);
	}

	step_x_amount(e) {
		return (
			(typeof this.props.x_increment === 'function'
				? this.props.x_increment(e, this.props)
				: this.props.x_increment) || this.props.x_step
		);
	}

	step_y_amount(e) {
		return (
			(typeof this.props.y_increment === 'function'
				? this.props.y_increment(e, this.props)
				: this.props.y_increment) || this.props.y_step
		);
	}

	offset_x(e, dir) {
		let amount = this.step_x_amount(e) * dir * Math.sign(this.props.x_end - this.props.x_start);
		this.setState(previous_state => {
			return {
				x: this.format_x(
					(previous_state.x === undefined ? this.props.x_start : previous_state.x) +
						amount,
					this.props.cyclical ? cycle : clamp
				)
			};
		});
	}

	offset_y(e, dir) {
		let amount = this.step_y_amount(e) * dir * Math.sign(this.props.y_end - this.props.y_start);
		this.setState(previous_state => {
			return {
				y: this.format_y(
					(previous_state.y === undefined ? this.props.y_start : previous_state.y) +
						amount,
					this.props.cyclical ? cycle : clamp
				)
			};
		});
	}

	keydown(e) {
		let handled = true;
		switch (e.key) {
			case 'ArrowUp':
				this.offset_y(e, -1);
				break;
			case 'ArrowDown':
				this.offset_y(e, 1);
				break;
			case 'ArrowLeft':
				this.offset_x(e, -1);
				break;
			case 'ArrowRight':
				this.offset_x(e, 1);
				break;
			default:
				handled = false;
		}
		if (handled) {
			e.preventDefault();
		}
	}
}

Pad.propTypes = {
	property: PropTypes.any,
	x_start: PropTypes.number.isRequired,
	x_end: PropTypes.number.isRequired,
	y_start: PropTypes.number.isRequired,
	y_end: PropTypes.number.isRequired,
	x_step: PropTypes.number.isRequired,
	y_step: PropTypes.number.isRequired,
	x_precision: PropTypes.number.isRequired,
	y_precision: PropTypes.number.isRequired,
	x_increment: PropTypes.number,
	y_increment: PropTypes.number,
	x: PropTypes.number,
	y: PropTypes.number,
	tabIndex: PropTypes.number,
	className: PropTypes.string,
	cyclical: PropTypes.bool.isRequired,
	onChange: PropTypes.func,
	onStart: PropTypes.func,
	onEnd: PropTypes.func
};

Pad.defaultProps = {
	x_start: 0,
	x_end: 100,
	y_start: 0,
	y_end: 100,
	x_step: 1,
	y_step: 1,
	x_precision: 0,
	y_precision: 0,
	tabIndex: 0,
	cyclical: false,
	onChange: noop,
	onStart: noop,
	onEnd: noop
};

export default Pad;
