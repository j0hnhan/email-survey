import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <div><h2>dashboard</h2></div>;
const Survey = () => <div><h2>survey</h2></div>;



class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path='/' component={Landing} />
						<Route exact path='/surveys' component={Dashboard} />
						<Route path='/survey/new' component={Survey} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}


export default connect(null, actions)(App);