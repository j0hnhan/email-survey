const _ = require("lodash");
const { URL } = require("url");
const Path = require("path-parser");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/templates/surveyTemplate");
const Survey = mongoose.model("survey");

module.exports = app => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: 0
		});
		res.send(surveys);
	});

	app.get("/api/surveys/:surveyId/:choice", (req, res) => {
		res.send("Thanks for your voting!!");
	});

	app.delete("/api/surveys/:surveyId", requireLogin, async (req, res) => {
		await Survey.findOneAndRemove({_id: req.params.surveyId}).exec();
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: 0
		});
		res.send(surveys);
	});

	app.post("/api/surveys/webhook", (req, res) => {
		const p = new Path("/api/surveys/:surveyId/:choice");
		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return {
						email: email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy("email", "surveyId")
			.each(({ email, surveyId, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, response: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { "recipients.$.response": true },
						lastResponse: new Date()
					}
				).exec();
			})
			.value();
		res.send({});
	});

	app.post("/api/surveys", requireLogin, requireCredit, async (req, res) => {
		const { title, body, subject, recipients } = req.body;
		const survey = new Survey({
			title: title,
			subject: subject,
			body: body,
			recipients: recipients.split(",").map(email => {
				return { email: email.trim() };
			}),
			_user: req.user.id,
			dateSent: Date.now()
		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
