import React from 'react';

import Pad from '../Pad/Pad';
import PadHandle from '../Pad/PadHandle';
import ColorBand from '../ColorBand/ColorBand';

import './ColorPad.css';

class SaturationValuePad extends React.PureComponent {
	render() {
		return (
			<div className='uix-colorpad uix-colorpad--saturationvalue'>
				<HueSpectrum hue={this.props.hue}/>
				<Pad 
					x={ this.props.saturation } 
					y={ this.props.brightness }
					x_step='0.2'
					x_precision='1'
					y_start='100'
					y_end='0'
					y_step='0.2'
					y_precision='1'
					onChange={this.props.onChange}
					property={this.props.property}
					onStart={this.props.onStart}
					onEnd={this.props.onEnd}
				>
					<PadHandle/>
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
					direction='to right' 
					colors={
						[
							`hsl(${hue}, 100%, 100%)`,
							`hsl(${hue}, 100%, 50%)`
						]
					}
				/>

				<ColorBand 
					direction='to bottom' 
					colors={
						[
							`hsla(${hue}, 100%, 0%, 0)`,
							`hsla(${hue}, 100%, 0%, 1)`
						]
					}
				/>
			</React.Fragment>
		);
	}
}

export default SaturationValuePad;