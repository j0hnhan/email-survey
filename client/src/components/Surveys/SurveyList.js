import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurvey();
	}

	renderList() {
		return this.props.surveys.map(survey => {
			return (
				<div class="card darken-2">
					<div class="card-content">
						<span class="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">{new Date(survey.dateSent).toLocaleString()}</p>
					</div>
					<div class="card-action">
						<a>Yes: {survey.yes} </a>
						<a>No: {survey.no} </a>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.renderList()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { surveys: state.surveys };
}

export default connect(mapStateToProps, actions)(SurveyList);