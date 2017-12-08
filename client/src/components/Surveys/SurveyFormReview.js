import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = props => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{props.formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className="btn-flat yellow darken-3 white-text"
				onClick={props.onCancel}
			>
				<i className="left material-icons">arrow_back</i>
				Back
			</button>
			<button
				className="btn-flat green right white-text"
				onClick={() => props.submitSurvey(props.formValues, props.history)}
			>
				Send
				<i className="right material-icons">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
