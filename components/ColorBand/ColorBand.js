import React from 'react';

import './ColorBand.css';

const is_gecko = navigator.userAgent.indexOf('Gecko/') >= 0;

const linearGradient = (direction = 'to right', stops) => `
	${ is_gecko ? '-moz-linear-gradient' : 'linear-gradient' }(
		${ direction }, 
		${ stops.join(', ') }
	)
`;

class ColorBand extends React.PureComponent {
	render() {

		let {
			className,
			direction,
			colors
		} = this.props;

		return (
			<div 
				className={`
					uix-colorband
					${ className || '' }
				`}
				style={
					{
						backgroundImage: linearGradient(direction, colors)
					}
				}
			/>
		);
	}
}

ColorBand.defaultProps = {
	direction: 'to right',
	colors: ['#fff', '#000']
};

export default ColorBand;