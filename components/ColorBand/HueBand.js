import React from 'react';
import ColorBand from './ColorBand';

const rainbow = [
	"hsl(0, 100%, 50%)",
	"hsl(60, 100%, 50%)",
	"hsl(120, 100%, 50%)",
	"hsl(180, 100%, 50%)",
	"hsl(240, 100%, 50%)",
	"hsl(300, 100%, 50%)",
	"hsl(360, 100%, 50%)"
];

const HueBand = ({ direction }) => 
	<ColorBand 
		className='uix-colorband--hue'
		direction={direction} 
		colors={rainbow} 
	/>;

export default HueBand;