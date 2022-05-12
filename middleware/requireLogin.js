const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = require("../key");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
	const token = req.header('Authorization')
	console.log(token)
	if (!token) {
		return res.status(401).json({ error: "You must be logged In" });
	}
	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "You must be logged In" });
		}
		const { _id} = payload;
		User.findById(_id).then((userdata) => {
			req.user = userdata;
			next();
		});
	});
};