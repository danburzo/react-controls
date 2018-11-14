import React from 'react';
import { action } from '@storybook/addon-actions';

class State extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.initial;
		this.__setState = function(state) {
			action('setState')(state);
			this.setState(state);
		}.bind(this);
	}

	render() {
		return this.props.children({ state: this.state, setState: this.__setState });
	}
}

State.defaultProps = {
	initial: {}
};

export default State;
