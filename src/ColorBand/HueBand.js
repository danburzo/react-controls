import React from 'react';
import PropTypes from 'prop-types';

import ColorBand from './ColorBand';

const rainbow = [
	'hsl(0, 100%, 50%)',
	'hsl(60, 100%, 50%)',
	'hsl(120, 100%, 50%)',
	'hsl(180, 100%, 50%)',
	'hsl(240, 100%, 50%)',
	'hsl(300, 100%, 50%)',
	'hsl(360, 100%, 50%)'
];

const HueBand = ({ direction, className }) => (
	<ColorBand
		className={`${className || ''} uix-colorband--hue`}
		direction={direction}
		colors={rainbow}
	/>
);

HueBand.propTypes = {
	/**
	 * Any additional class names to pass to the component.
	 */
	className: PropTypes.string,

	/**
	 * The gradient's direction.
	 */
	direction: PropTypes.string
};

export default HueBand;
