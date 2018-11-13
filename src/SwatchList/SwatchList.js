import React from 'react';
import PropTypes from 'prop-types';

import List from '../List/List';
import ListItem from '../List/ListItem';
import { noop } from '../util/functions';

import './SwatchList.css';

class SwatchList extends React.Component {
	render() {
		let props = {
			...this.props,
			className: `uix-swatchlist ${this.props.className || ''}`,
			children: React.Children.map(this.props.children, child => (
				<ListItem key={child.props.value} value={child.props.value}>
					{child}
				</ListItem>
			))
		};

		return <List {...props} />;
	}
}

SwatchList.propTypes = {
	property: PropTypes.any,
	onSelect: PropTypes.func
};

SwatchList.defaultProps = {
	onSelect: noop
};

export default SwatchList;
