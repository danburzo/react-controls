import React from 'react';

import MultiSlider from '../MultiSlider/MultiSlider';
import MultiSliderHandle from '../MultiSlider/MultiSliderHandle';
import ColorBand from '../ColorBand/ColorBand';

import './GradientSlider.css';

class GradientSlider extends React.Component {

	static getDerivedStateFromProps(props, current_state) {
		return {
			stops: props.stops
		};
	} 

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onInsert = this.onInsert.bind(this);

		this.state = {};
	}

	onChange(value, stop_idx) {
		this.setState(
			prev_state => {
				return {
					stops: prev_state.stops.map(
						(stop, i) => i === stop_idx ? {...stop, position: value } : stop
					)
				}
			}
		)
	}

	onInsert(value) {
		this.setState(
			prev_state => ({
				stops: prev_state.stops.concat({
					// todo should interpolate colors
					color: 'tomato',
					position: value
				})
			})
		);
	}

	render() {

		let { 
			stops 
		} = this.state;

		return (
			<div className='uix-gradient'>
				<ColorBand 
					colors={
						stops
							.slice()
							.sort((a, b) => a.position - b.position)
							.map(s => `${s.color} ${s.position}%`)
					}
				/>
				<MultiSlider 
					onChange={this.onChange}
					onInsert={this.onInsert}
				>
					{
						stops.map(
							(stop, idx) => 
								<MultiSliderHandle 
									key={idx} 
									value={stops[idx].position}
									property={idx}
								/>
						)
					}
				</MultiSlider>
			</div>
		);
	}
}

GradientSlider.defaultProps = {
	stops: [
		{ position: 0, color: '#000' },
		{ position: 100, color: '#fff' }
	]
};

export default GradientSlider;