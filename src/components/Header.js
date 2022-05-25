import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isPunOpen: false
        };
    }

    toggleNav() {
	    this.setState({
	      isNavOpen: !this.state.isNavOpen
	    });
	}

	render() {
		return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><strong>Create PI Tags</strong></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="justify-content-center nav-pills nav-justified mt-2" style={{ width: "100%" }}>
                            <NavItem>
                                <NavLink className="nav-link"  to='/step1'>Step 1: Enter PI Tag Information</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/step2'>Step 2: Placeholder</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/step3'>Step 3: Placeholder</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
		);
	}
}

export default Header;
