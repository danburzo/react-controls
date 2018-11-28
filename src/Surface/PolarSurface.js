// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import scalePolar from '../util/scalePolar';
import { noop } from '../util/functions';
import Surface from './Surface';

import './PolarSurface.css';

class PolarSurface extends React.PureComponent {
	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
	}

	change({ x, y }) {
		let { r, t } = scalePolar(x, y);
		this.props.onChange(
			{
				r: Math.min(r, 50),
				t: t
			},
			this.props.property
		);
	}

	render() {
		return (
			<Surface
				className="uix-surface--polar"
				onChange={this.change}
				onStart={this.props.onStart}
				onEnd={this.props.onEnd}
				x_scale={x_scale}
				y_scale={y_scale}
				passive={this.props.passive}
				interacting={this.props.interacting}
				property={this.props.property}
			>
				{this.props.children}
			</Surface>
		);
	}
}

const x_scale = scaleLinear()
	.range([-50, 50])
	.clamp(true);
const y_scale = scaleLinear()
	.range([50, -50])
	.clamp(true);

PolarSurface.propTypes = {
	onStart: PropTypes.func,
	onChange: PropTypes.func,
	onEnd: PropTypes.func,
	passive: PropTypes.bool.isRequired,
	interacting: PropTypes.bool.isRequired,
	property: PropTypes.any
};

PolarSurface.defaultProps = {
	onChange: noop,
	passive: false,
	interacting: false
};

export default PolarSurface;
