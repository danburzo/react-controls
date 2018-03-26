import React from 'react';
import EventListener from 'react-event-listener';

import { noop } from '../util/functions';

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

		this.end = this.end.bind(this);

		this.state = initial_state;
	}

	startIncrease(e) {
		this.setState({
			increasing: true
		}, () => {
			this.start(e);
			this.doIncrease(repeat_delay);
		});
		e.preventDefault();
	}

	doIncrease(timeout = repeat_interval) {
		if (this.state.increasing) {
			this.props.increase();
			window.setTimeout(this.doIncrease, timeout);
		}
	}

	stopIncrease(e) {
		this.setState({
			increasing: false
		}, () => { this.end(e) });
	}

	start(e) {
		this.props.start(e);
	}

	end(e) {
		this.props.end(e);
	}

	startDecrease(e) {
		this.setState({
			decreasing: true
		}, () => {
			this.start(e);
			this.doDecrease(repeat_delay);
		});
		e.preventDefault();
	}

	doDecrease(timeout = repeat_interval) {
		if (this.state.decreasing) {
			this.props.decrease();
			window.setTimeout(this.doDecrease, timeout);
		}
	}

	stopDecrease(e) {
		this.setState({
			decreasing: false
		}, () => { this.end(e) });
	} 

	render() {

		let {
			increasing,
			decreasing
		} = this.state;

		return (
			<span className='uix-input__controls'>
				<span 
					className='uix-input__control uix-input__control--increment'
					onMouseDown={this.startIncrease}
				>
					<svg viewBox='0 0 20 9' className='uix-icon uix-icon--uparrow'>
						<path d='M 5 7 L 10 2 L 15 7'/>
					</svg>
				</span>

				{ 
					increasing && 
						<EventListener
							target='document'
							onMouseUp={this.stopIncrease}
						/>
				}
				
				<span 
					className='uix-input__control uix-input__control--decrement'
					onMouseDown={this.startDecrease}
				>
					<svg viewBox='0 0 20 9' className='uix-icon uix-icon--downarrow'>
						<path d='M 5 2 L 10 7 L 15 2'/>
					</svg>
				</span>

				{ 
					decreasing && 
						<EventListener
							target='document'
							onMouseUp={this.stopDecrease}
						/>
				}
			</span>
		);
	}
};

NumericInputControls.defaultProps = {
	increase: noop,
	decrease: noop,
	end: noop,
	start: noop
};

export default NumericInputControls;