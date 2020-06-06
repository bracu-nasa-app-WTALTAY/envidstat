import React, { Component } from 'react'
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBCollapse,
	MDBNavItem,
	MDBNavLink,
	MDBContainer
} from 'mdbreact'

import './Navbar.css'

class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collapse: false,
			isWideEnough: false
		}
	}

	onClick = () => {
		this.setState({
			collapse: !this.state.collapse
		})
	}

	render() {
		return (
			<header>
				<MDBNavbar
					color='elegant-color'
					className={this.props.pathname === '/' ? 'no-shadow' : ''}
					fixed='top'
					dark
					transparent={this.props.pathname === '/'}
					expand='md'
					scrolling>
					<MDBContainer>
						<MDBNavbarBrand href='/'>
							<img
								src={`${process.env.PUBLIC_URL}/assets/img/logo-color-sm.png`}
								className='img-fluid'
								alt='navlogo-envidstat'
							/>
							<strong>
								ENVID
								<span className='text-primary'>STAT</span>
							</strong>
						</MDBNavbarBrand>
						<MDBNavbarToggler onClick={this.onClick} />
						<MDBCollapse isOpen={this.state.collapse} navbar>
							<MDBNavbarNav right>
								<MDBNavItem active={this.props.pathname === '/'}>
									<MDBNavLink to='/'>Home</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem active={this.props.pathname === '/maps'}>
									<MDBNavLink to='/maps'>Maps</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem active={this.props.pathname === '/statistics'}>
									<MDBNavLink to='/statistics'>Statistics</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem active={this.props.pathname === '/about'}>
									<MDBNavLink to='/about'>About</MDBNavLink>
								</MDBNavItem>
							</MDBNavbarNav>
						</MDBCollapse>
					</MDBContainer>
				</MDBNavbar>
			</header>
		)
	}
}

export default Navbar
