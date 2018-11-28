// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import Position from '../Position/Position';
import { noop } from '../util/functions';

import './Surface.css';

const initial_state = {
	interacting: false
};

/*
	Component: Surface
	----------------------------------------

	This low-level component will relay the user's coordinates
	(via the Position component) in relation with the surface's bounds,
	on the `onChange` callback. This callback will receive values 
	for the X and Y coordinates in percentages (interval [0..100]).
	
*/

class Surface extends React.Component {
	constructor(props) {
		super(props);

		// Bind event handlers
		this.register = this.register.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
		this.change = this.change.bind(this);
		this.insert = this.insert.bind(this);

		this.state = initial_state;
	}

	register(wrapper) {
		this.wrapper = wrapper;
	}

	start(e) {
		this.setState({
			interacting: true
		});
		this.props.onStart(e);
		this.change({
			x: e.clientX,
			y: e.clientY
		});
		e.stopPropagation();
	}

	end(e) {
		this.setState({
			interacting: false
		});
		this.props.onEnd(e);
	}

	scale({ x, y }) {
		if (this.wrapper) {
			let rect = this.wrapper.getBoundingClientRect();
			return {
				x: this.props.x_scale.domain([rect.left, rect.right])(x),
				y: this.props.y_scale.domain([rect.top, rect.bottom])(y)
			};
		}
	}

	change(coords) {
		this.props.onChange(this.scale(coords), this.props.property);
	}

	insert(e) {
		this.props.onInsert(
			this.scale({
				x: e.clientX,
				y: e.clientY
			}),
			this.props.property
		);
	}

	render() {
		let { className, passive } = this.props;

		let interacting = passive ? this.props.interacting : this.state.interacting;

		let events = {};
		if (passive) {
			events['onDoubleClick'] = this.insert;
		} else {
			events['onMouseDownCapture'] = this.start;
		}

		return (
			<div className={`uix-surface ${className || ''}`} ref={this.register} {...events}>
				{interacting && <Position onChange={this.change} onEnd={this.end} />}

				{this.props.children}
			</div>
		);
	}
}

Surface.propTypes = {
	property: PropTypes.any,
	className: PropTypes.string,
	onStart: PropTypes.func,
	onChange: PropTypes.func,
	onEnd: PropTypes.func,
	onInsert: PropTypes.func,
	x_scale: PropTypes.func,
	y_scale: PropTypes.func,
	passive: PropTypes.bool.isRequired,
	interacting: PropTypes.bool
};

Surface.defaultProps = {
	onStart: noop,
	onEnd: noop,
	onChange: noop,
	onInsert: noop,
	x_scale: scaleLinear()
		.range([0, 100])
		.clamp(true),
	y_scale: scaleLinear()
		.range([0, 100])
		.clamp(true),
	passive: false,
	interacting: false
};

export default Surface;
