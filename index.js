const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const Keys = require("./config/key");
require("./models/user");
require("./models/survey");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(Keys.MONGO_URI);

const app = express();
app.use(bodyParser.json());
app.use(
	cookieSession({
		keys: [Keys.SESSION_KEY],
		maxAge: 30 * 24 * 60 * 60 * 1000
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoute")(app);
require("./routes/billingRoute")(app);
require("./routes/surveyRoute")(app);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);
