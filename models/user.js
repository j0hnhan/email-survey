const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	oauthID: String,
	credits: {
		type: Number,
		default: 0
	}
});

mongoose.model("user", UserSchema);
