import React from 'react';

import './Swatch.css';

const Swatch = ({ className, color, title, children }) =>
	<div 
		className={`
			uix-swatch
			${ className || '' }
		`}
		title={title}
	>
		{ children }
		<div 
			className='uix-swatch__inner' 
			style={{ backgroundColor: color }} 
		/>
	</div>

export default Swatch;