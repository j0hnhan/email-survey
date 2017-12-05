import { FETCH_SURVEY } from '../actions/type';

export default (state = [], action) => {
	switch(action.type) {
		case FETCH_SURVEY:
			return action.payload;
		default:
			return state;
	}
}