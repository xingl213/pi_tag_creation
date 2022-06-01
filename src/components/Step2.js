import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Step2 extends Component {

	constructor(props) {
		super(props);
		this.handlePublish = this.handlePublish.bind(this);

		this.state = {
			hasReponse: false,
			response: ""
		};
	}

	handlePublish() {
		fetch("https://api.plos.org/search?q=title:DNA") // TODO: build urls using pi web api controllers
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						hasReponse: true,
						response: result.response
					});
				});
	}

	render() {
		const response = this.state.response;

		return(
			<div className="container">
				<h1>Please conplete step 1 first.</h1>
				<Button onClick={this.handlePublish}>Publish</Button>

				<h2>Response:</h2>	
				<div>{JSON.stringify(response)}</div>
			</div>
		);		
	}
}

export default Step2;
