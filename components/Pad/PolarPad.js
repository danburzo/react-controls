import React from 'react';
import { scaleLinear } from 'd3-scale';
import memoize from 'memoize-one';

import { PolarSurface } from '../Surface';

import { to_step } from '../util/math';
import { noop } from '../util/functions';

const r_scale = memoize(
	(start, end) => scaleLinear()
		.domain([0, 50])
		.range([start, end])
		.clamp(true)
);

const t_scale = memoize(
	(start, end) => scaleLinear()
		.domain([-Math.PI, Math.PI])
		.range([start, end])
		.clamp(true)
);

const initial_state = {
	interacting: false
};

class PolarPad extends React.PureComponent {

	constructor(props) {

		super(props);

		this.onChange = this.onChange.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onEnd = this.onEnd.bind(this);

		this.state = initial_state;

	}

	onStart() {
		this.setState({ 
			interacting: true 
		});
	}

	onEnd() {
		this.setState({ 
			interacting: false 
		});
	}

	onChange({ r, t }) {

		let r_val = to_step(r_scale(this.props.r_start, this.props.r_end)(r), this.props.r_step, this.props.r_precision);
		let t_val = to_step(t_scale(this.props.t_start, this.props.t_end)(t), this.props.t_step, this.props.t_precision);

		// don't update state with the same values
		if (r_val === this.props.r && t_val === this.props.t) {
			return; 
		}

		this.props.onChange({
			r: r_val, 
			t: t_val
		}, this.props.property);
	}

	render() {

		let {
			interacting
		} = this.state;

		let {
			r,
			t,
			r_step,
			t_step,
		} = this.props;

		return (
			<div className='uix-polarpad'>
				<PolarSurface 
					onChange={this.onChange}
					onStart={this.onStart}
					onEnd={this.onEnd}
				>
					{
						React.Children.map(
							this.props.children,
							child => React.cloneElement(child, {
								r: r,
								t: t,
								r_scale: r_scale(this.props.r_start, this.props.r_end),
								t_scale: t_scale(this.props.t_start, this.props.t_end),
								r_step: r_step,
								t_step: t_step,
								interacting: interacting,

								...child.props
							})
						)
					}
				</PolarSurface>
			</div>
		);
	}
}

PolarPad.defaultProps = {
	r: 0,
	r_start: 0,
	r_end: 100,
	t_start: -180,
	t_end: 180,
	r_step: 1,
	r_precision: 0,
	t_step: 1,
	t_precision: 0,
	t: 0,
	onChange: noop,
	property: undefined
};

export default PolarPad;