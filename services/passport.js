const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Keys = require("../config/key");

const User = mongoose.model("user");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: Keys.GOOGLE_CLIENT_ID,
			clientSecret: Keys.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ oauthID: profile.id }).then(result => {
				if (result) {
					done(null, result);
				} else {
					new User({ oauthID: profile.id }).save().then(user => {
						done(null, user);
					});
				}
			});
		}
	)
);
