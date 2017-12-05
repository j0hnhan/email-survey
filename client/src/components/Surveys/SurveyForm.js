import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom';

import SurveyField from "./SurveyField";
import formFields from "./formFields";

import validateEmail from '../../utils/validateEmail';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, field => {
			return (
				<Field
					key={field.name}
					name={field.name}
					label={field.label}
					type="text"
					component={SurveyField}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
				>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="right teal white-text  btn-flat">
						next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmail(values.recipients || '');
	_.each(formFields, (field) => {
		if(!values[field.name]) {
			errors[field.name] = field.noValueError;
		}
	});

	return errors;
}

export default reduxForm({
	form: "surveyForm",
	validate: validate,
	destroyOnUnmount: false
})(SurveyForm);
