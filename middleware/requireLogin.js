const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = require("../key");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(400).json({ error: "NO token provided" });
	}
	const token = authorization.replace("Bearer ", "you must be logged in");
	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(40).json({ error: "" });
		}
		const { _id} = payload;
		User.findById(_id).then((userdata) => {
			req.user = userdata;
			next();
		});
	});
};


// {
// 	"title":"post 1",
// 	"body":"this is posst 1",
// 	"status":"active"
// 	}