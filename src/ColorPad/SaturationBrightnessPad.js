import React from 'react';
import PropTypes from 'prop-types';

import Pad from '../Pad/Pad';
import PadHandle from '../Pad/PadHandle';
import ColorBand from '../ColorBand/ColorBand';

import { noop } from '../util/functions';

import './ColorPad.css';

class SaturationValuePad extends React.PureComponent {
	render() {
		return (
			<div className="uix-colorpad uix-colorpad--saturationvalue">
				<HueSpectrum className={this.props.className} hue={this.props.hue} />
				<Pad
					x={this.props.saturation}
					y={this.props.brightness}
					x_step={0.2}
					x_precision={1}
					y_start={100}
					y_end={0}
					y_step={0.2}
					y_precision={1}
					onChange={this.props.onChange}
					property={this.props.property}
					onStart={this.props.onStart}
					onEnd={this.props.onEnd}
				>
					<PadHandle />
				</Pad>
			</div>
		);
	}
}

class HueSpectrum extends React.PureComponent {
	render() {
		let { hue } = this.props;
		return (
			<React.Fragment>
				<ColorBand
					className={this.props.className}
					direction="to right"
					colors={[`hsl(${hue}, 100%, 100%)`, `hsl(${hue}, 100%, 50%)`]}
				/>

				<ColorBand
					className={this.props.className}
					direction="to bottom"
					colors={[`hsla(${hue}, 100%, 0%, 0)`, `hsla(${hue}, 100%, 0%, 1)`]}
				/>
			</React.Fragment>
		);
	}
}

HueSpectrum.propTypes = {
	className: PropTypes.string
};

SaturationValuePad.propTypes = {
	hue: PropTypes.number.isRequired,
	saturation: PropTypes.number,
	brightness: PropTypes.number,
	onStart: PropTypes.func,
	onChange: PropTypes.func,
	onEnd: PropTypes.func,
	property: PropTypes.any,
	className: PropTypes.string
};

SaturationValuePad.defaultProps = {
	onStart: noop,
	onChange: noop,
	onEnd: noop
};

export default SaturationValuePad;
