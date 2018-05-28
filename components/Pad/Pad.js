import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { noop } from '../util/functions';
import memoize from 'memoize-one';
import { to_step, clamp, cycle } from '../util/math';

import './Pad.css';

import { Surface } from '../Surface';

const initial_state = {
	x: undefined,
	y: undefined,
	interacting: false,
	previous_props: {}
};

const scale = memoize(
	(start, end) => scaleLinear()
		.domain([0, 100])
		.range([start, end])
		.clamp(true)
);

class Pad extends React.PureComponent {

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

	format_x(value, method = clamp) {
		return value !== undefined ? to_step(
			method(value, this.props.x_start, this.props.x_end),
			this.props.x_step, 
			this.props.x_precision
		) : undefined;
	}

	format_y(value, method = clamp) {
		return value !== undefined ? to_step(
			method(value, this.props.y_start, this.props.y_end),
			this.props.y_step, 
			this.props.y_precision)
		: undefined;
	}

	change({x, y}) {
		let x_val = this.format_x(scale(this.props.x_start, this.props.x_end)(x));
		let y_val = this.format_y(scale(this.props.y_start, this.props.y_end)(y));
		this.broadcast(x_val, y_val);
	}

	broadcast(x, y) {
		if (x !== this.props.x || y !== this.props.y) {
			this.props.onChange({x, y}, this.props.property);
		}
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

	render() {

		let {
			x,
			y,
			cyclical,
			tabIndex,
			className,
			x_step,
			y_step,
			x_precision,
			y_precision,
			x_start,
			x_end,
			y_start,
			y_end
		} = this.props;

		let { interacting } = this.state;

		let x_scale = scale(x_start, x_end);
		let y_scale = scale(y_start, y_end);

		return (
			<div 
				className={`
					uix-pad 
					${cyclical ? 'uix-pad--cyclical' : '' } 
					${interacting ? 'uix-pad--interacting' : '' } 
					${className || ''}
				`}
				tabIndex={tabIndex}
				onKeyDown={this.keydown}
			>
				<Surface
					onStart={this.start}
					onEnd={this.end} 
					onChange={this.change}
				>
				{ 
					React.Children.map(
						this.props.children, 
						child => React.cloneElement(child, {
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
					) 
				}
				</Surface>
			</div>
		);
	}

	step_x_amount(e) {
		return (
			typeof this.props.x_increment === 'function' ? 
				this.props.x_increment(e, this.props) : this.props.x_increment
		) || this.props.x_step;
	}

	step_y_amount(e) {
		return (
			typeof this.props.y_increment === 'function' ? 
				this.props.y_increment(e, this.props) : this.props.y_increment
		) || this.props.y_step;
	}

	offset_x(e, dir) {
		let amount = this.step_x_amount(e) * dir * Math.sign(this.props.x_end - this.props.x_start);
		this.broadcast(
			this.format_x(
				(this.props.x === undefined ? this.props.x_start : this.props.x) + amount,
				this.props.cyclical ? cycle : clamp
			),
			this.props.y
		);
	}

	offset_y(e, dir) {
		let amount = this.step_y_amount(e) * dir * Math.sign(this.props.y_end - this.props.y_start);
		this.broadcast(
			this.props.x,
			this.format_y(
				(this.props.y === undefined ? this.props.y_start : this.props.y) + amount,
				this.props.cyclical ? cycle : clamp
			)
		);
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

Pad.defaultProps = {
	property: undefined,
	x_start: 0,
	x_end: 100,
	y_start: 0,
	y_end: 100,
	x_step: 1,
	y_step: 1,
	x_precision: 0,
	y_precision: 0,
	x_increment: undefined,
	y_increment: undefined,
	x: undefined,
	y: undefined,
	tabIndex: 0,
	className: undefined,
	cyclical: false,
	onChange: noop,
	onStart: noop,
	onEnd: noop
};

export default Pad;