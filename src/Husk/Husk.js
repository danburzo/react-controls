import React from 'react';
import { func } from 'prop-types';

class Husk extends React.Component {
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
		return null;
	}
}

Husk.propTypes = {
	useEffect: func
};

export default Husk;
