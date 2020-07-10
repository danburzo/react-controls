import React from 'react';

import './CustomSelectionUI.css';

class CustomSelectionUI extends React.Component {
	render() {
		let circles = [[20, 20, 1], [40, 40, 2], [60, 60, 3], [80, 80, 4], [100, 100, 5]].map(
			arr => (
				<circle
					cx={arr[0]}
					cy={arr[1]}
					r="10"
					onClick={() => {
						this.props.onSelect(arr[2]);
					}}
					className={this.props.value === arr[2] ? 'selected' : ''}
				/>
			)
		);

		return (
			<div>
				<p>Click on any circle</p>
				<svg className="custom-selection-ui" width="120" height="120" viewBox="0 0 120 120">
					{circles}
				</svg>
			</div>
		);
	}
}

export default CustomSelectionUI;
