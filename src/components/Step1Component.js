import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Step1 extends Component {

	render() {
		return(
			<div className="container mt-2">
				<div className="m-2">
					<span>PI Tag Name: </span>
					<input/>
				</div>
				<div className="m-2">
					<span>Description: </span>
					<input/>
				</div>
				<div className="m-2">
					<span>Instrument Tag: </span>
					<input/>
				</div>
				<div className="m-2">
					<span>Data Type: </span>
					<input/>
				</div>
				<div className="m-2">
					<span>Max Value: </span>
					<input/>
				</div>
				<div className="m-2">
					<span>Min Value: </span>
					<input/>
				</div>
				<div className="m-2">
					<span>Frequency: </span>
					<input/>
				</div>
				<div>
					<Button color="primary">Validate</Button>
				</div>
			</div>
		);
	}
}

export default Step1;
