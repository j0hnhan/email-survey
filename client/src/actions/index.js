import axios from 'axios';
import { FETCH_USER } from './type';


export const fetchUser = () => async dispatch => {
	const request = await axios.get('/api/current_user')
	dispatch({ type: FETCH_USER, payload: request.data });
};

export const handleToken = (token) => async dispatch => {
	const request = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: request.data });
};
