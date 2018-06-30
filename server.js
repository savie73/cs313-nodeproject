var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://finaluser:john@localhost:5432/finalproject";
const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));

app.get("/getResults", getResults);

app.listen(app.get("port"), function() {
	console.log("listening" + app.get("port"));

});

function getResults(req, res) {
	console.log("Getting results..");

	var id = req.query.id;
	console.log("id..");

	getResultsFromDb(id, function(error, result) {

		console.log("back from the get db db with resultss", result);
		res.json(result);
	});
}

function getResultsFromDb(id, callback) {
	console.log("get results from db from id");

	var sql = "SELECT skin_id, type FROM skin_type WHERE skin_id= $1::int"; 
	var params = [id];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("an error occured with the DB");
			console.log(err);
			callback(err, null);
		}

		console.log("found Db: result" + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}