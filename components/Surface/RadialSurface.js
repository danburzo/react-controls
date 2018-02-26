import React from 'react';
import EventListener from 'react-event-listener';

import { scaleLinear } from 'd3-scale';

import { polar_scale } from '../util/math';
import { noop } from '../util/functions';

import { Surface } from './';

class RadialSurface extends React.PureComponent {
	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
	}

	change({x, y}) {
		let { r, t } = polar_scale(x, y);
		this.props.onChange({
			r: Math.min(r, 50),
			t: t
		});
	}

	render() {
		return (
			<Surface
				className='uix-surface--radial'
				onChange={this.change}
				onStart={this.props.onStart}
				onEnd={this.props.onEnd}
				x_scale={x_scale}
				y_scale={y_scale}
				passive={this.props.passive}
				interacting={this.props.interacting}
			>
				{ this.props.children }
			</Surface>
		);
	}
}

const x_scale = scaleLinear().range([-50, 50]).clamp(true);
const y_scale = scaleLinear().range([50, -50]).clamp(true);

RadialSurface.defaultProps = {
	onChange: noop,
	onStart: undefined,
	onEnd: undefined,
	passive: false,
	interacting: false
};

export default RadialSurface;