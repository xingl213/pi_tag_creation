import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Switch, Route, Redirect } from 'react-router-dom';

function Main() {

	const callbackFunction = (childPiTagInfo) => {
	}

	return (
		<div>
			<Header />
			<Switch>
				<Route path='/step1' component={() => <Step1 parentCallback={callbackFunction} />} />
				<Route exact path='/step2' component={Step2} />
				<Route exact path='/step3' component={Step3} />
				<Redirect to="/step1" />
			</Switch>
			<Footer />
		</div>
	);
}

export default Main;
