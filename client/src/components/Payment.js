import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payment extends Component {
	render() {
		return (
			<StripeCheckout
				name="Email Survey"
				description="$5 for 5 credits"
				amount={500}
				currency="USD"
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
				token={(token) => this.props.handleToken(token)}
			>
				<button className="btn">
					Add Credits
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payment);