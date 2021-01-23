const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3002;

const db = require("./models");
const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true
// });
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.post("/api/workouts", ({ body }, res) => {
	db.Workout.create(body)
		.then((data) => {
			console.log("data", data);
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
	db.Workout.findByIdAndUpdate(
		params.id,
		{ $push: { exercises: body } },
		{ new: true, runValidators: true }
	)
		.then((data) => {
			console.log("data", data);
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.get("/api/workouts", (req, res) => {
	db.Workout.find({})
		.then((data) => {
			console.log("data", data);
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.get("/api/workouts/range", (req, res) => {
	db.Workout.find({})
		.limit(7)
		.then((data) => {
			console.log("data", data);
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});
app.get("/exercise", function (req, res) {
	console.log("In /exercise html route");
	res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", function (req, res) {
	console.log("In /stats html route");
	res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
