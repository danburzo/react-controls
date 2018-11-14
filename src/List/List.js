import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../util/functions';
import './List.css';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
	}

	select(value) {
		this.props.onSelect(value, this.props.property);
		if (value !== this.props.value) {
			this.props.onChange(value, this.props.property);
		}
	}

	render() {
		let { value, tabIndex, className } = this.props;

		return (
			<ul className={`uix-list ${className || ''}`} tabIndex={tabIndex}>
				{React.Children.map(this.props.children, child =>
					React.cloneElement(child, {
						onSelect: this.select,
						tabIndex: tabIndex,
						selected: value === child.props.value
					})
				)}
			</ul>
		);
	}
}

List.propTypes = {
	/**
	 * The component's tab index.
	 */
	tabIndex: PropTypes.number,

	/**
	 * Any additional class names to pass to the component.
	 */
	className: PropTypes.string,

	/**
	 * An optional identifier to pass along to the callback functions.
	 */
	property: PropTypes.any,

	/**
	 * The component's tab index.
	 */
	value: PropTypes.any,

	/**
	 * When the `property` prop is set, it will be passed back as the second argument.
	 */
	onChange: PropTypes.func,

	/**
	 * When the `property` prop is set, it will be passed back as the second argument.
	 */
	onSelect: PropTypes.func
};

List.defaultProps = {
	tabIndex: 0,
	onChange: noop,
	onSelect: noop
};

export default List;
