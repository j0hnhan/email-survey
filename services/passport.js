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
		async (accessToken, refreshToken, profile, done) => {
			const result = await User.findOne({ oauthID: profile.id });
			if (result) {
				done(null, result);
			} else {
				const user = await new User({ oauthID: profile.id }).save();
				done(null, user);
			}
		}
	)
);
