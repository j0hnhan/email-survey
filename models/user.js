const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	oauthID: String
});

mongoose.model("user", UserSchema);
