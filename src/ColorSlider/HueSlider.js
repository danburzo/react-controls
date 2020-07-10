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
				vertical={this.props.vertical}
			>
				<HueBand direction={this.props.direction} className={this.props.sliderClassName} />
				<SliderHandle className={this.props.padClassName} />
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
	direction: PropTypes.string,
	padClassName: PropTypes.string,
	sliderClassName: PropTypes.string
};

HueSlider.defaultProps = {
	onStart: noop,
	onChange: noop,
	onEnd: noop,
	direction: 'to right',
	vertical: false
};

export default HueSlider;
