const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
	const res = emails
	.split(",")
	.map(email => email.trim())
	.filter(email => {
		return re.test(email) === false;
	});

	if(res.length) {
		return `These emails are invalid ${res}`;
	}
	return;
}