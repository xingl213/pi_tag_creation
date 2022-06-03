import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

	render() {
		return(
			<div className="footer mt-4">
				<div className="container">
                    <ul className="list-unstyled">
                        <li className="footer-list-item rounded"><Link to='/step1'>Step 1: Input and Validate</Link></li>
                        <li className="footer-list-item rounded"><Link to='/step2'>Step 2: Publish</Link></li>
                        <li className="footer-list-item rounded"><Link to='/step3'>Step 3: Placeholder</Link></li>
                    </ul>
				</div>
				<div className="container copyright">© Copyright 2022 Rio Tinto</div>
			</div>
		);
	}
}

export default Footer;
