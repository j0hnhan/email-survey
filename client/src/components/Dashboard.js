import React from 'react';
import { Link } from 'react-router-dom';

import SurveyList from './Surveys/SurveyList';

const DashBoard = () => {
	return (
		<div style={{marginTop: "20px"}}>
			<div>
				<SurveyList />
			</div>
			<div className="fixed-action-btn">
	    		<Link to="/survey/new" className="btn-floating btn-large red">
	      			<i className="large material-icons">add</i>
	    		</Link>
	    	</div>
    	</div>
	);
};

export default DashBoard;