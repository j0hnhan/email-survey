import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

class Header extends Component {
	renderContent() {
		switch(this.props.auth) {
			case null:
				return; 
			case false:
				return  [
					<li key="1"><a href="/auth/google">Login With Google</a></li>,
					<li key="2"><a href="/auth/facebook">Login With Facebook</a></li>
				];
			default:
				return [
					<li key="1"><Payment /></li>,
					<li key="2" style={{margin: '0 10px'}}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="3"><a href="/api/logout">logout</a></li>
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link 
						to={this.props.auth? '/surveys': '/'} 
						className="brand-logo"
					>
							Email-Survey
					</Link>
					<ul className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);