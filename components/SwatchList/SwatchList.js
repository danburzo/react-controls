import React from 'react';

import List from '../List/List';
import ListItem from '../List/ListItem';

import './SwatchList.css';

import { noop } from '../util/functions';

class SwatchList extends React.Component {
	render() {

		let props = {
			...this.props,
			className: `uix-swatchlist ${this.props.className || ''}`,
			children: React.Children.map(
				this.props.children,
				child => 
					<ListItem 
						key={child.props.value}
						value={child.props.value}
					>
						{ child }
					</ListItem>
			)
		}

		return <List {...props}/>;
	}
}

SwatchList.defaultProps = {
	property: undefined,
	onSelect: noop
};

export default SwatchList;

