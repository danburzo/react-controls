import React from 'react';
import { func } from 'prop-types';

class Husk extends React.Component {
	componentDidMount() {
		if (this.props.useEffect) {
			this.on_unmount = this.props.useEffect();
		}
	}

	componentWillUnmount() {
		if (this.on_unmount) {
			this.on_unmount();
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
