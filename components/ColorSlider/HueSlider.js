import React from 'react';

import Slider from '../Slider/Slider';
import SliderHandle from '../Slider/SliderHandle';
import HueBand from '../ColorBand/HueBand';

class HueSlider extends React.PureComponent {
	render() {
		return (
			<Slider 
				value={this.props.hue}
				property={this.props.property}
				start='0'
				end='360'
				step='1'
				onChange={this.props.onChange}
				onStart={this.props.onStart}
				onEnd={this.props.onEnd}
			>
				<HueBand/>
				<SliderHandle/>
			</Slider>
		);
	}
}

export default HueSlider;