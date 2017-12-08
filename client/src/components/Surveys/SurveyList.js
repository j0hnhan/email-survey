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
				<div key={survey._id} className="card darken-2">
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">{new Date(survey.dateSent).toLocaleString()}</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes} </a>
						<a>No: {survey.no} </a>
						<button className="btn darken-2 red right" style={{marginTop:"-7px"}} onClick={() => this.props.deleteSurvey(survey._id)}>
							Delete
						</button>
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