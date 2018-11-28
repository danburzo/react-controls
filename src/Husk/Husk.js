import React from 'react';
import { func, object, oneOfType } from 'prop-types';

class Husk extends React.Component {
	constructor(props) {
		super(props);
		let us = this.props.useState;
		this.state = typeof us === 'function' ? us(props) : us;
		this.__setState = this.setState.bind(this);
	}

	componentDidMount() {
		if (this.props.useEffect) {
			this.__cleanup = this.props.useEffect();
		}
	}

	componentWillUnmount() {
		if (typeof this.__cleanup === 'function') {
			this.__cleanup();
			this.__cleanup = null;
		}
	}

	render() {
		return this.props.children ? this.props.children(this.state, this.__setState) : null;
	}
}

Husk.propTypes = {
	useEffect: func,
	useState: oneOfType([object, func])
};

Husk.defaultProps = {
	useState: {}
};

export default Husk;
