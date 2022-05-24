import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
	constructor(props) {
		super(props);

		// TODO: change this to store a list of pi tags instead of just one
		this.state = {
			piTagInfo: {
				piTagName: "",
				description: '', 
				instrTag: '',
				dataType: '',
				maxVal: '',
				minVal: '',
				freq: ''
			}
		};
	}

	callbackFunction = (childPiTagInfo) => {
		this.setState({
			piTagInfo: Object.assign({}, childPiTagInfo)
		});
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route path='/step1' component={() => <Step1 piTagInfo={this.state.piTagInfo} parentCallback={this.callbackFunction} />} />
					<Route exact path='/step2' component={Step2} />
					<Route exact path='/step3' component={Step3} />
					<Redirect to="/step1" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
