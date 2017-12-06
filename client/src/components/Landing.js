import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {
	renderButton() {
		switch(this.props.auth) {
			case null: 
				return;
			case false:
				return;
			default:
				return <Link style={{marginTop: "10px"}} className="teal btn-flat" to="/surveys">Dashboard</Link>;
		}
	}
	render() {
		return (
			<div style={landingStyle}>
				<div style={{margin: "30vh 0"}}>
					<h1>Email - Survey</h1>
					<h6>User feedback collect tool</h6>
					{this.renderButton()}
				</div>
			</div>
		);
	}
}

const landingStyle = {
	height: '40vh',
	textAlign:'center',
}

function mapStateToProps(state) {
	return {auth: state.auth};
}

export default connect(mapStateToProps)(Landing);