import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { to_step } from '../util/math';
import { noop } from '../util/functions';
import Surface from '../Surface/Surface';

import './BandPad.css';

const initial_state = {
	interacting: false
};

class BandPad extends React.Component {
	static getDerivedStateFromProps(props, current_state) {
		let state = {},
			changed = false;

		if (current_state.values !== props.values) {
			state['values'] = props.values || new Array(props.bands).fill(0);
			changed = true;
		}

		if (current_state.bands !== props.bands) {
			state['bands'] = props.bands;
			state['scale'] = scaleLinear()
				.domain([0, 100])
				.range([0, props.bands])
				.clamp(true);
			changed = true;
		}

		return changed ? state : null;
	}

	constructor(props) {
		super(props);

		this.onStart = this.onStart.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onChange = this.onChange.bind(this);

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

	onChange({ x, y }) {
		let band = Math.floor(this.state.scale(x));
		if (band >= this.props.bands) {
			band = this.props.bands - 1;
		}

		let proposed_value = to_step(100 - y, this.props.step, this.props.precision);

		this.setState(
			previous_state => {
				return {
					values: previous_state.values.map((val, idx) =>
						idx === band ? proposed_value : val
					)
				};
			},
			() => {
				this.props.onChange(this.state.values, this.props.property);
			}
		);
	}

	render() {
		let { bands } = this.props;

		let { values } = this.state;

		return (
			<div className="uix-bandpad">
				<Surface onStart={this.onStart} onEnd={this.onEnd} onChange={this.onChange}>
					{React.Children.map(this.props.children, child =>
						React.cloneElement(child, {
							bands: bands,
							values: values,
							...child.props
						})
					)}
				</Surface>
			</div>
		);
	}
}

BandPad.propTypes = {
	values: PropTypes.array,
	bands: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired,
	precision: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	property: PropTypes.string
};

BandPad.defaultProps = {
	values: new Array(36).fill(0),
	bands: 36,
	step: 1,
	precision: 0,
	onChange: noop
};

export default BandPad;
