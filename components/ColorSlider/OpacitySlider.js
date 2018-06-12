import React from 'react';
import memoize from 'memoize-one';
import culori, { formatter as culoriFormatter } from 'culori';

import Slider from '../Slider/Slider';
import SliderHandle from '../Slider/SliderHandle';
import ColorBand from '../ColorBand/ColorBand';
import CheckerboardBand from '../ColorBand/CheckerboardBand';

let css = culoriFormatter();

const colors_for_color = memoize(
	str => {
		let color = culori(str);
		return [ css({...color, alpha: 0 }), css({...color, alpha: 1 }) ];
	}
);

class OpacitySlider extends React.PureComponent {
	render() {
		let colors = colors_for_color(this.props.color);
		return (
			<Slider 
				value={this.props.opacity}
				property={this.props.property}
				start='0'
				end='100'
				onChange={this.props.onChange}
				onStart={this.props.onStart}
				onEnd={this.props.onEnd}
			>
				<CheckerboardBand />
				<ColorBand colors={colors} />
				<SliderHandle/>
			</Slider>
		);
	}
};

export default OpacitySlider;