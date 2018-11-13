// Libs
import React from 'react';
import culori, {
	formatter as culoriFormatter,
	round as culoriRound,
	hsv as culoriHsv
} from 'culori';
import PropTypes from 'prop-types';

import { noop } from '../util/functions';

import NumericInput from '../Input/NumericInput';
import Swatch from '../Swatch/Swatch';
import ColorVariations from '../ColorVariations/ColorVariations';
import SaturationBrightnessPad from '../ColorPad/SaturationBrightnessPad';
import CheckerboardBand from '../ColorBand/CheckerboardBand';
import HueSlider from '../ColorSlider/HueSlider';
import OpacitySlider from '../ColorSlider/OpacitySlider';
import ColorTextInput from '../Input/ColorTextInput';

import './ColorPicker.css';

const initial_state = {
	hue: 0,
	saturation: 100,
	value: 100,
	opacity: 100
};

class ColorPicker extends React.PureComponent {
	static getDerivedStateFromProps(props, current_state) {
		return props.reactive ? extract_hsba(props.value) : null;
	}

	constructor(props) {
		super(props);
		this.changed = this.changed.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
		this.setColor = this.setColor.bind(this);
		this.setColorPreserveOpacity = this.setColorPreserveOpacity.bind(this);
		this.state = { ...initial_state, ...extract_hsba(props.value) };
	}

	changed(value, property) {
		this.setState(typeof property === 'function' ? property(value) : { [property]: value });
	}

	setColor(color) {
		this.setState(extract_hsba(color));
	}

	setColorPreserveOpacity(color) {
		let { opacity, ...state } = extract_hsba(color);
		this.setState(state);
	}

	start(e) {
		this.props.onStart(_css(hsba_to_hsv(this.state)), e);
	}

	end(e) {
		this.props.onEnd(_css(hsba_to_hsv(this.state)), e);
	}

	componentDidUpdate() {
		let val = _css(hsba_to_hsv(this.state));
		if (val !== this.props.value) {
			this.props.onChange(val, this.props.property);
		}
	}

	render() {
		let { hue, saturation, brightness, opacity } = this.state;

		let color = _css(hsba_to_hsv(this.state));
		let color_full_opacity = _css(hsba_to_hsv({ ...this.state, opacity: 100 }));

		return (
			<div className="uix-colorpicker">
				<div className="uix-colorpicker__section uix-colorpicker__section--hsb">
					<SaturationBrightnessPad
						hue={hue}
						saturation={saturation}
						brightness={brightness}
						onChange={this.changed}
						property={sb_to_state}
						onStart={this.start}
						onEnd={this.end}
					/>

					<HueSlider
						hue={hue}
						onChange={this.changed}
						property="hue"
						onStart={this.start}
						onEnd={this.end}
					/>

					<OpacitySlider
						color={color_full_opacity}
						opacity={opacity}
						onChange={this.changed}
						property="opacity"
						onStart={this.start}
						onEnd={this.end}
					/>
				</div>

				<div className="uix-colorpicker__section uix-colorpicker__section--variations">
					<ColorVariations
						onSelect={this.setColorPreserveOpacity}
						color={color_full_opacity}
						scale={toWhite}
						trim
					/>

					<ColorVariations
						onSelect={this.setColorPreserveOpacity}
						color={color_full_opacity}
						scale={toBlack}
						trim
					/>

					<ColorVariations
						onSelect={this.setColorPreserveOpacity}
						color={color_full_opacity}
						scale={color => [
							color,
							hsba_to_hsv({ ...this.state, hue: this.state.hue + 90 })
						]}
						trim
						mode="hsv"
					/>
				</div>

				<div className="uix-colorpicker__section uix-colorpicker__section--current">
					<Swatch color={color}>
						<CheckerboardBand />
					</Swatch>

					<ColorTextInput onChange={this.setColor} value={color} />

					<NumericInput
						start="0"
						end="100"
						value={opacity}
						onChange={this.changed}
						property="opacity"
						onStart={this.start}
						onEnd={this.end}
					>
						<span
							style={{
								position: 'absolute',
								right: '0.25em',
								top: '50%',
								transform: 'translate(0, -50%)'
							}}
						>
							%
						</span>
					</NumericInput>
				</div>
			</div>
		);
	}
}

ColorPicker.propTypes = {
	className: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onStart: PropTypes.func,
	onChange: PropTypes.func,
	onEnd: PropTypes.func,
	property: PropTypes.any,

	/**
		For this HSB color picker, having it update in response to 
		a change in this.props.value, which would normally be
		a serialized value (in HEX or RGBA format), wouild interfere
		with the user dragging the Saturation/Brightness control.

		(That is because converting HSB -> RGB -> HSB is lossy)

		To overcome this, we introduce the `reactive` flag that dictates
		whether the color picker should update on `componentWillReceiveProps`.
	 */
	reactive: PropTypes.bool
};

ColorPicker.defaultProps = {
	value: 'rgba(255, 0, 0, 1)',
	onChange: noop,
	onStart: noop,
	onEnd: noop,
	reactive: false
};

/*
	Utilities
	-----------------------------------------------------------------
 */

const toWhite = color => [color, 'white'];
const toBlack = color => [color, 'black'];

const roundi = culoriRound(0);
const _css = culoriFormatter();

const extract_hsba = color => {
	let hsba = culoriHsv(color);
	let ret = {};
	if (!hsba) return ret;
	if (hsba.h !== undefined) ret['hue'] = hsba.h;
	if (hsba.s !== undefined) ret['saturation'] = hsba.s * 100;
	if (hsba.v !== undefined) ret['brightness'] = hsba.v * 100;
	if (hsba.alpha !== undefined) ret['opacity'] = roundi(hsba.alpha * 100);
	return ret;
};

const hsba_to_hsv = color =>
	culoriHsv({
		h: color.hue % 360,
		s: color.saturation / 100,
		v: color.brightness / 100,
		alpha: color.opacity / 100
	});

const sb_to_state = ({ x: saturation, y: brightness }) => ({ saturation, brightness });

export default ColorPicker;
