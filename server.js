var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://finaluser:john@localhost:5432/finalproject";
const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));
app.get("/getResults", getResults);
app.use(express.static('public'));

app.listen(app.get("port"), function() {
	console.log("listening" + app.get("port"));

});

function getResults2(request, response) {
	//var source =  $("#price").val(); //do I need to use this in the update section?
	//var skin_id = $("#skin").val();
	
	console.log("Searching for data..");

	

	$.get(connectionString, function(data, status) {

		console.log("Back from server with the following results:")
		console.log(status);
		console.log(data);

		updateResults(data);
	
	});
}

function getResults(request, response) {
	var source = request.query.price;
	var skin_id = request.query.skin;
	//need to get data varibles cheap and skin_id...howww
	
	//var resultsD = $("#results");

	if(source == 'cheap') {
		var sql = "SELECT foundation.* FROM foundation INNER JOIN foundation_skin ON foundation.found_id = foundation_skin.found_id WHERE foundation.price <= 20 AND foundation_skin.skin_id= $1::int";
		var params = [skin_id];
		pool.query(sql, params, function (err, results) {
			if (err) {
				response.json(err);
			} else {
				response.json(results.rows);
			}
		})
		/*for (let row of rows)
			{
				resultD.append(
      			"<div class="w3-col l3 s6">"
      			"<div class="w3-container">"
				"<img src="' . $row['image'] . '" alt="alt text"  width="100%" />"
      			' ' .row['brand'];
      			' ' .row['product_name'];
      			' $' . row['price'];
		  		"<br/>"
      			"</div>"
      			"</div>"
      			);
			}*/
		
		
	}	
	else if (source == 'pricey') {
		var sql = "SELECT foundation.* FROM foundation INNER JOIN foundation_skin ON foundation.found_id = foundation_skin.found_id WHERE foundation.price >= 21 AND foundation_skin.skin_id= $1::int";
		var params = [skin_id];
		pool.query(sql, params, function (err, results) {
			if (err) {
				response.json(err);
			} else {
				response.json(results.rows);
			}
		})
		/*foreach (rows as row)
			{
				resultD.append(
      			"<div class="w3-col l3 s6">"
      			"<div class="w3-container">"
				"<img src="' . $row['image'] . '" alt="alt text"  width="100%" />"
      			' ' .row['brand'];
      			' ' .row['product_name'];
      			' $' . row['price'];
		  		"<br/>"
      			"</div>"
      			"</div>"
      			);
			}
*/
		
	}	
}