import React from 'react';

class SliderProgress extends React.PureComponent {
	render() {
		let {
			x,
			y,
			x_scale,
			y_scale,
			vertical,
			interacting
		} = this.props;

		let style = {};
		if (vertical) {
			style['height'] = (100 - y_scale.invert(y)) + '%';
		} else {
			style['width'] = x_scale.invert(x) + '%';
		}

		return (
			<span
				className={`
					rc-slider__progress 
					${ interacting ? 'rc-slider__progress--interacting' : '' }
				`}
				style={style}
			/>
			
		);
	}
}

export default SliderProgress;