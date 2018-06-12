import React from 'react';
import guid from '../util/guid';

import './ColorBand.css';

class CheckerboardBand extends React.PureComponent {

	constructor(props) {
		super(props);
		this._pattern_id = `checkerboard-pattern-${guid()}`;
	}

	render() {

		let { 
			size, 
			fill 
		} = this.props;

		return (
			<svg className='uix-colorband uix-colorband--checkerboard'>
				<defs>
					<pattern 
						id={this._pattern_id}
						x='0'
						y='0'
						width={size}
						height={size}
						patternUnits="userSpaceOnUse"
					>
						<g fill={fill}>
							<rect x='0' y='0' width={size} height={size} fill='#fff'/>
							<rect x='0' y='0' width={size/2} height={size/2}/>
							<rect x={size/2} y={size/2} width={size/2} height={size/2}/>
						</g>
					</pattern>
				</defs>

				<rect 
					x='0' 
					y='0' 
					width='100%' 
					height='100%'
					fill={`url(#${this._pattern_id})`}
				/>
			</svg>
		);
	}
}

CheckerboardBand.defaultProps = {
	size: 10,
	fill: '#ccc'
};

export default CheckerboardBand;