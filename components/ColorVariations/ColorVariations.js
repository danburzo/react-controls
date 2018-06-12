import React from 'react';
import culori, {
	formatter as culoriFormatter,
	samples as culoriSamples,
	interpolate as culoriInterpolate
} from 'culori';

import { noop } from '../util/functions';

import Swatch from '../Swatch/Swatch';
import SwatchList from '../SwatchList/SwatchList';

import './ColorVariations.css';

const hex = culoriFormatter('hex');

class ColorVariations extends React.PureComponent {
	render() {

		let {
			color,
			scale,
			count,
			mode,
			className,
			tabIndex,
			trim
		} = this.props;

		let variations = culoriSamples(count).map(culoriInterpolate(scale(color), mode)).map(hex);

		if (trim) {
			variations = variations.slice(1, variations.length - 1);
		}

		return (
			<SwatchList
				className={`
					uix-colorvariations
					${ className || '' }
				`}
				tabIndex={tabIndex}
				onSelect={this.props.onSelect}
				property={this.props.property}
			>
				{
					variations.map(
						(swatch, idx) => 
							<Swatch 
								key={idx} 
								color={swatch} 
								value={swatch} 
								title={swatch}
							/>
					)
				}
			</SwatchList>
		);
	}
}

ColorVariations.defaultProps = {
	trim: false,
	className: undefined,
	tabIndex: 0,
	color: 'red',
	scale: color => ([color, 'black']),
	mode: 'lab',
	count: 9,
	onSelect: noop
};

export default ColorVariations;