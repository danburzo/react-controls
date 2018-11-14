import React from 'react';
import PropTypes from 'prop-types';

import guid from '../util/guid';

import './ColorBand.css';

class CheckerboardBand extends React.PureComponent {
	constructor(props) {
		super(props);
		this._pattern_id = `uix-pattern-${guid()}`;
	}

	render() {
		let { size } = this.props;

		return (
			<svg
				className={`${this.props.className ||
					''} uix-colorband uix-colorband--checkerboard`}
			>
				<defs>
					<pattern
						id={this._pattern_id}
						x="0"
						y="0"
						width={size}
						height={size}
						patternUnits="userSpaceOnUse"
					>
						<g fill={this.props.fill}>
							<rect x="0" y="0" width={size} height={size} fill="#fff" />
							<rect x="0" y="0" width={size / 2} height={size / 2} />
							<rect x={size / 2} y={size / 2} width={size / 2} height={size / 2} />
						</g>
					</pattern>
				</defs>

				<rect x="0" y="0" width="100%" height="100%" fill={`url(#${this._pattern_id})`} />
			</svg>
		);
	}
}

CheckerboardBand.propTypes = {
	/**
	 * Any additional class names to pass to the component.
	 */
	className: PropTypes.string,

	/**
	 * The size, in pixels, for the checkerboard squares.
	 */
	size: PropTypes.number,

	/**
	 * The fill color for the darker squares.
	 */
	fill: PropTypes.string
};

CheckerboardBand.defaultProps = {
	size: 10,
	fill: '#ccc'
};

export default CheckerboardBand;
