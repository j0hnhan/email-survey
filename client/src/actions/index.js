import axios from 'axios';
import { FETCH_USER } from './type';
import { FETCH_SURVEY } from './type';


export const fetchUser = () => async dispatch => {
	const request = await axios.get('/api/current_user')
	dispatch({ type: FETCH_USER, payload: request.data });
};

export const handleToken = (token) => async dispatch => {
	const request = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: request.data });
};

export const submitSurvey = (formValues, history) => async dispatch => {
	const request = await axios.post('/api/surveys', formValues);
	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: request.data });
};

export const fetchSurvey = () => async dispatch => {
	const request = await axios.get('/api/surveys');
	dispatch({type: FETCH_SURVEY, payload: request.data });
};

export const deleteSurvey = (surveyId) => async dispatch => {
	const request = await axios.delete(`/api/surveys/${surveyId}`);
	dispatch({type: FETCH_SURVEY, payload: request.data });
}
