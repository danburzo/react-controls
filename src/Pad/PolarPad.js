import React from 'react';
import { scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';

import PolarSurface from '../Surface/PolarSurface';
import { to_step } from '../util/math';
import { noop } from '../util/functions';

import './PolarPad.css';

const initial_state = {
	interacting: false
};

class PolarPad extends React.PureComponent {
	static getDerivedStateFromProps(props) {
		return {
			r: props.r,
			t: props.t,
			r_scale: scaleLinear()
				.domain([0, 50])
				.range([props.r_start, props.r_end])
				.clamp(true),
			t_scale: scaleLinear()
				.domain([-Math.PI, Math.PI])
				.range([props.t_start, props.t_end])
				.clamp(true)
		};
	}

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
		let r_val = to_step(this.state.r_scale(r), this.props.r_step, this.props.r_precision);
		let t_val = to_step(this.state.t_scale(t), this.props.t_step, this.props.t_precision);

		// don't update state with the same values
		if (r_val === this.state.r && t_val === this.state.t) {
			return;
		}

		this.setState(
			{
				r: r_val,
				t: t_val
			},
			() => {
				this.props.onChange(
					{
						r: this.state.r,
						t: this.state.t
					},
					this.props.property
				);
			}
		);
	}

	render() {
		let { r, t, interacting, r_scale, t_scale } = this.state;

		let { r_step, t_step } = this.props;

		return (
			<div className="uix-polarpad">
				<PolarSurface onChange={this.onChange} onStart={this.onStart} onEnd={this.onEnd}>
					{React.Children.map(this.props.children, child =>
						React.cloneElement(child, {
							r: r,
							t: t,
							r_scale: r_scale,
							t_scale: t_scale,
							r_step: r_step,
							t_step: t_step,
							interacting: interacting,

							...child.props
						})
					)}
				</PolarSurface>
			</div>
		);
	}
}

PolarPad.propTypes = {
	r: PropTypes.number,
	r_start: PropTypes.number.isRequired,
	r_end: PropTypes.number.isRequired,
	r_step: PropTypes.number.isRequired,
	r_precision: PropTypes.number.isRequired,
	t: PropTypes.number.isRequired,
	t_start: PropTypes.number.isRequired,
	t_end: PropTypes.number.isRequired,
	t_step: PropTypes.number.isRequired,
	t_precision: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	property: PropTypes.any
};

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
	onChange: noop
};

export default PolarPad;
