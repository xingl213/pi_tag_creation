import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Step1 from './Step1Component';
import Step2 from './Step2Component';
import Step3 from './Step3Component';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route path='/step1' component={Step1} />
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
