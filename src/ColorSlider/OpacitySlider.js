import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { rgb, formatter } from 'culori';

import Slider from '../Slider/Slider';
import SliderHandle from '../Slider/SliderHandle';
import ColorBand from '../ColorBand/ColorBand';
import CheckerboardBand from '../ColorBand/CheckerboardBand';

import { noop } from '../util/functions';

let css = formatter();

const colors_for_color = memoize(str => {
	let color = rgb(str);
	return [css({ ...color, alpha: 0 }), css({ ...color, alpha: 1 })];
});

class OpacitySlider extends React.PureComponent {
	render() {
		let colors = colors_for_color(this.props.color);
		return (
			<Slider
				value={this.props.opacity}
				property={this.props.property}
				start={0}
				end={100}
				onChange={this.props.onChange}
				onStart={this.props.onStart}
				onEnd={this.props.onEnd}
			>
				<CheckerboardBand />
				<ColorBand colors={colors} />
				<SliderHandle />
			</Slider>
		);
	}
}

OpacitySlider.propTypes = {
	opacity: PropTypes.number,
	color: PropTypes.string.isRequired,
	onStart: PropTypes.func,
	onChange: PropTypes.func,
	onEnd: PropTypes.func
};

OpacitySlider.defaultProps = {
	onStart: noop,
	onChange: noop,
	onEnd: noop
};

export default OpacitySlider;
