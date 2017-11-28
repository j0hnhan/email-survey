const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const Keys = require("./config/key");
require("./models/user");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(Keys.MONGO_URI);

const app = express();
app.use(
	cookieSession({
		keys: [Keys.SESSION_KEY],
		maxAge: 30 * 24 * 60 * 60 * 1000
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoute")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
