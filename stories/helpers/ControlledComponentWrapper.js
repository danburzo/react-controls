import React from 'react';
import { action } from '@storybook/addon-actions';

class ControlledComponentWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange(value, prop) {
		// action('onChange')(value, prop);
		this.setState({ [prop]: value });
	}

	render() {

		let child = React.Children.only(this.props.children);
		let Component = child.type;

		let value = this.state[child.props.property] || 0;

		let vprops;
		if (typeof value === 'object') {
			vprops = { ...value };
		} else {
			vprops = { value };
		}

		return (
			<Component {...child.props} {...vprops} onChange={this.onChange}/>
		);
	}
}

export default ControlledComponentWrapper;