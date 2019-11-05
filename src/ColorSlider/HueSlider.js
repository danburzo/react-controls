import React from 'react';
import PropTypes from 'prop-types';

import Slider from '../Slider/Slider';
import SliderHandle from '../Slider/SliderHandle';
import HueBand from '../ColorBand/HueBand';

import { noop } from '../util/functions';

class HueSlider extends React.PureComponent {
	render() {
		return (
			<Slider
				className="uix-slider--hue"
				value={this.props.hue}
				property={this.props.property}
				start={0}
				end={360}
				step={1}
				vertical={this.props.vertical}
				onChange={this.props.onChange}
				onStart={this.props.onStart}
				onEnd={this.props.onEnd}
			>
				<HueBand direction={this.props.direction} />
				<SliderHandle />
			</Slider>
		);
	}
}

HueSlider.propTypes = {
	onStart: PropTypes.func,
	onChange: PropTypes.func,
	onEnd: PropTypes.func,
	property: PropTypes.any,
	hue: PropTypes.number,
	vertical: PropTypes.bool,
	direction: PropTypes.string
};

HueSlider.defaultProps = {
	onStart: noop,
	onChange: noop,
	onEnd: noop
};

export default HueSlider;
