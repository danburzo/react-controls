import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../util/functions';

import Husk from '../Husk/Husk';

import './InputControls.css';

const initial_state = {
	increasing: false,
	decreasing: false
};

const repeat_delay = 600; // milliseconds
const repeat_interval = 50; // milliseconds

class NumericInputControls extends React.PureComponent {
	constructor(props) {
		super(props);

		this.startIncrease = this.startIncrease.bind(this);
		this.doIncrease = this.doIncrease.bind(this);
		this.stopIncrease = this.stopIncrease.bind(this);

		this.startDecrease = this.startDecrease.bind(this);
		this.doDecrease = this.doDecrease.bind(this);
		this.stopDecrease = this.stopDecrease.bind(this);

		this.state = initial_state;
	}

	startIncrease(e) {
		this.setState(
			{
				increasing: true
			},
			() => {
				this.props.onStart(e);
				this.doIncrease(repeat_delay);
			}
		);
		e.preventDefault();
	}

	doIncrease(timeout = repeat_interval) {
		if (this.state.increasing) {
			this.props.increase();
			window.setTimeout(this.doIncrease, timeout);
		}
	}

	stopIncrease(e) {
		this.setState(
			{
				increasing: false
			},
			() => {
				this.props.onEnd(e);
			}
		);
	}

	startDecrease(e) {
		this.setState(
			{
				decreasing: true
			},
			() => {
				this.props.onStart(e);
				this.doDecrease(repeat_delay);
			}
		);
		e.preventDefault();
	}

	doDecrease(timeout = repeat_interval) {
		if (this.state.decreasing) {
			this.props.decrease();
			window.setTimeout(this.doDecrease, timeout);
		}
	}

	stopDecrease(e) {
		this.setState(
			{
				decreasing: false
			},
			() => {
				this.props.onEnd(e);
			}
		);
	}

	render() {
		let { increasing, decreasing } = this.state;

		return (
			<span className="uix-input__controls">
				<span
					className="uix-input__control uix-input__control--increment"
					onMouseDown={this.startIncrease}
				>
					<svg viewBox="0 0 20 9" className="uix-icon uix-icon--uparrow">
						<path d="M 5 7 L 10 2 L 15 7" />
					</svg>
				</span>

				{increasing && (
					<Husk
						useEffect={() => {
							document.addEventListener('mouseup', this.stopIncrease);
							return () => {
								document.removeEventListener('mouseup', this.stopIncrease);
							};
						}}
					/>
				)}

				<span
					className="uix-input__control uix-input__control--decrement"
					onMouseDown={this.startDecrease}
				>
					<svg viewBox="0 0 20 9" className="uix-icon uix-icon--downarrow">
						<path d="M 5 2 L 10 7 L 15 2" />
					</svg>
				</span>

				{decreasing && (
					<Husk
						useEffect={() => {
							document.addEventListener('mouseup', this.stopDecrease);
							return () => {
								document.removeEventListener('mouseup', this.stopDecrease);
							};
						}}
					/>
				)}
			</span>
		);
	}
}

NumericInputControls.propTypes = {
	increase: PropTypes.func,
	decrease: PropTypes.func,
	onEnd: PropTypes.func,
	onStart: PropTypes.func
};

NumericInputControls.defaultProps = {
	increase: noop,
	decrease: noop,
	onEnd: noop,
	onStart: noop
};

export default NumericInputControls;
