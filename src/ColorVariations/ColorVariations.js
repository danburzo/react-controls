import React from 'react';
import PropTypes from 'prop-types';
import { formatter, samples, interpolate } from 'culori';

import { noop } from '../util/functions';

import Swatch from '../Swatch/Swatch';
import SwatchList from '../SwatchList/SwatchList';

import './ColorVariations.css';

const hex = formatter('hex');

class ColorVariations extends React.PureComponent {
	render() {
		let { color, scale, count, mode, className, tabIndex, trim } = this.props;

		let variations = samples(count)
			.map(interpolate(scale(color), mode))
			.map(hex);

		if (trim) {
			variations = variations.slice(1, variations.length - 1);
		}

		return (
			<SwatchList
				className={`
					uix-colorvariations
					${className || ''}
				`}
				tabIndex={tabIndex}
				onSelect={this.props.onSelect}
				property={this.props.property}
			>
				{variations.map((swatch, idx) => (
					<Swatch key={idx} color={swatch} value={swatch} title={swatch} />
				))}
			</SwatchList>
		);
	}
}

ColorVariations.propTypes = {
	trim: PropTypes.bool,
	className: PropTypes.string,
	tabIndex: PropTypes.number,
	color: PropTypes.string,
	scale: PropTypes.func,
	mode: PropTypes.string,
	count: PropTypes.number,
	onSelect: PropTypes.func
};

ColorVariations.defaultProps = {
	trim: false,
	tabIndex: 0,
	color: 'red',
	scale: color => [color, 'black'],
	mode: 'lab',
	count: 9,
	onSelect: noop
};

export default ColorVariations;
