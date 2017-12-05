const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipientSchema = new Schema({
	email: String,
	response:  {
		type: Boolean,
		default: false
	}
});

module.exports = RecipientSchema;
