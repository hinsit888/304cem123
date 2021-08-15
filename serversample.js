var http = require('http');
var fs = require("fs");
var qs = require("querystring");



var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017"
var ObjectId = require('mongodb').ObjectID;




//create a server object:
http.createServer(function (req, res) {

	if (req.url === "/apple") {
		res.write('Hello World!'); //write a response to the client
		res.end(); //end the response
	} else if (req.url === "/login") {
		sendFileContent(res, "index3.html", "text/html");
	} else if (req.url === "/index") {
		sendFileContent(res, "index.html", "text/html");
	}
	else if (req.url === "/favlist") {
		sendFileContent(res, "favlist.html", "text/html");
	}

	else if (req.url === "/abc") {
		sendFileContent(res, "about.html", "text/html");
	}

	else if (req.url === "/jq1") {
		sendFileContent(res, "jq1.html", "text/html");
	}
	else if (req.url === "/check_fav") {
		console.log("Requested URL is url" + req.url);

		//run AJAX code
		if (req.method === "POST") { // get the string
			formData = '';
			return req.on('data', function (data) {

				formData += data;
				console.log(formData);

				return req.on('end', function (data) {

					var user;
					var data;


					data = qs.parse(formData);
					user = data['login'];
					pwd = data['password'];
					console.log(user);
					console.log(pwd);
					//res.end("data=" + user + pwd);
					//res.end


					var query = { "loginid": user, "password": pwd }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						//dbo.collection("Login").insertOne(query, function(err, res) {

						dbo.collection("Login").find(query).toArray(function (err, result) {
							if (err) throw err;
							console.log("1 document inserted");
							console.log(JSON.stringify(result));
							if (result.length > 0) {
								res.end("Login successful");

							} else {
								res.end("Login fail");
								console.log("Login fail");
							}


							db.close();


							//return response.end(JSON.stringify(result));
						});


					});

				});

			});



		} else {


			res.end("abc");
		}

	}
	else if (req.url === '/add_message') {
		if (req.method === "POST") { // get the string
			formData = '';
			return req.on('data', function (data) {


				formData += data;
				console.log(formData);

				return req.on('end', function (datatwo) {
					var datatwo;

					datatwo = qs.parse(formData);
					console.log(datatwo);
					username = datatwo['username'];
					message = datatwo['message'];
					// console.log(usertwo);
					// console.log(regpwd);
					// res.end("Comment created!!");


					var query2 = { "username": username, "message": message }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						dbo.collection("Comment").insertOne(query2, function (err, result) {
							if (err) throw err;
							console.log("1 document inserted");
							res.end("Comment Create successful");
							db.close();
						});
					});

				});

			});

		} else {
			res.end("abc");
		}
	}
	else if (req.url === '/get_message') {
		if (req.method === "GET") { // get the string


			console.log('get_message');
			//var myobj = {"name":"hello"};
			MongoClient.connect(dbUrl, function (err, db) {
				if (err) throw err;
				var dbo = db.db("apple");
				//var myobj = stringMsg;
				dbo.collection("Comment").find({}).sort({ '_id': -1 }).toArray(function (err, result) {

					res.end(JSON.stringify(result));
					db.close();
				});

			});


		} else {
			res.end("abc");
		}
	}
	else if (req.url === '/delete_message') {
		if (req.method === "DELETE") { // get the string


			console.log('delete_message');
			formData = '';
			return req.on('data', function (data) {


				formData += data;
				console.log(formData);

				return req.on('end', function (datatwo) {
					var datatwo;

					datatwo = qs.parse(formData);
					console.log(datatwo);
					delete_id = datatwo['delete_id'];

					// console.log(usertwo);
					// console.log(regpwd);
					// res.end("Comment created!!");


					var query2 = { "_id": ObjectId(delete_id) }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						dbo.collection("Comment").deleteOne(query2, function (err, result) {
							if (err) throw err;

							res.end("Comment remove successful");
							db.close();
						});
					});

				});

			});



		} else {
			res.end("abc");
		}
	}
	else if (req.url === '/edit_message') {
		if (req.method === "PUT") { // get the string


			console.log('edit_message');
			formData = '';
			return req.on('data', function (data) {


				formData += data;
				console.log(formData);

				return req.on('end', function (datatwo) {
					var datatwo;

					datatwo = qs.parse(formData);
					console.log(datatwo);
					edit_id = datatwo['edit_id'];
					message = datatwo['message'];
					// console.log(usertwo);
					// console.log(regpwd);
					// res.end("Comment created!!");


					var query2 = { "_id": ObjectId(edit_id) }; //json
					var query3 = { $set: { "message": message } }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						dbo.collection("Comment").updateOne(query2, query3, function (err, result) {
							if (err) throw err;
							console.log(result);
							res.end("Comment update successful");
							db.close();
						});
					});

				});

			});



		} else {
			res.end("abc");
		}
	}
	else if (req.url === '/get_product') {
		if (req.method === "GET") { // get the string
			console.log('get_product');
			//var myobj = {"name":"hello"};
			MongoClient.connect(dbUrl, function (err, db) {
				if (err) throw err;
				var dbo = db.db("apple");
				//var myobj = stringMsg;
				dbo.collection("Product").find({}).toArray(function (err, result) {

					res.end(JSON.stringify(result));
					db.close();
				});

			});


		} else {
			res.end("abc");
		}
	}
	else if (req.url === '/update_fav') {
		if (req.method === "POST") { // get the string
			formData = '';
			return req.on('data', function (data) {


				formData += data;
				console.log(formData);

				return req.on('end', function (datatwo) {
					var datatwo;

					datatwo = qs.parse(formData);
					console.log(datatwo);
					username = datatwo['username'];
					product_id = datatwo['product_id'];
					title = datatwo['title'];
					img = datatwo['img'];
					// console.log(usertwo);
					// console.log(regpwd);
					// res.end("Comment created!!");


					var query2 = { "username": username, "product_id": product_id, "title": title, "img": img }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						dbo.collection("Fav").find(query2).toArray(function (err, result) {
							console.log(result.length);
							if (result.length > 0) {
								dbo.collection("Fav").deleteOne(query2, function (err, result) {
									if (err) throw err;
									res.end("Fav Remove successful");
									db.close();
								});
							} else {
								dbo.collection("Fav").insertOne(query2, function (err, result) {
									if (err) throw err;
									res.end("Fav Create successful");
									db.close();
								});
							}
							db.close();
						});
					});

				});

			});


		} else {


			res.end("abc");
		}
	}
	else if (req.url === '/get_fav') {
		if (req.method === "POST") { // get the string
			formData = '';
			return req.on('data', function (data) {


				formData += data;
				console.log(formData);

				return req.on('end', function (datatwo) {
					var datatwo;

					datatwo = qs.parse(formData);
					console.log(datatwo);
					username = datatwo['username'];
					product_id = datatwo['product_id'];
					// console.log(usertwo);
					// console.log(regpwd);
					// res.end("Comment created!!");


					var query2 = { "username": username, "product_id": product_id }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						dbo.collection("Fav").find(query2).toArray(function (err, result) {
							res.end((result.length).toString());
							db.close();
						});
					});

				});

			});


		} else {
			res.end("abc");
		}
	}
	else if (req.url === '/get_all_fav') {
		if (req.method === "POST") { // get the string
			formData = '';
			console.log('get_all_fav');
			return req.on('data', function (data) {


				formData += data;
				console.log(formData);

				return req.on('end', function (datatwo) {
					var datatwo;

					datatwo = qs.parse(formData);
					console.log(datatwo);
					username = datatwo['username'];
					// console.log(usertwo);
					// console.log(regpwd);
					// res.end("Comment created!!");


					var query2 = { "username": username }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;

						dbo.collection("Fav").find(query2).toArray(function (err, result) {
							if (result.length > 0) {
								res.end(JSON.stringify(result));
							} else {
								res.end(JSON.stringify(result));
							}
							db.close();
						});

					});

				});

			});


		} else {


			res.end("abc");
		}
	}
	//register
	else if (req.url === "/check_fav2") {
		console.log("Requested URL is url" + req.url);
		//run AJAX code two
		if (req.method === "POST") { // get the string
			formData = '';
			return req.on('data', function (datatwo) {

				formData += datatwo;
				console.log(formData);

				return req.on('end', function (datatwo) {

					var usertwo;
					var datatwo;


					datatwo = qs.parse(formData);
					usertwo = datatwo['RegisterID'];
					regpwd = datatwo['password'];
					console.log(usertwo);
					console.log(regpwd);
					res.end("Account created!!");


					var query2 = { "loginid": usertwo, "password": regpwd }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						dbo.collection("Login").insertOne(query2, function (err, res) {
							if (err) throw err;
							console.log("1 document inserted");
							//res.end("Account created!!");
							db.close();
						});
					});

				});

			});


		} else {


			res.end("abc");
		}
	}


	// fav list


	else if (req.url === "/check_fav3") {
		console.log("Requested URL is url" + req.url);

		//run AJAX code
		if (req.method === "POST") { // get the string
			formData = '';
			return req.on('data', function (datathree) {

				formData += datathree;
				console.log(formData);

				return req.on('end', function (datathree) {

					var user;
					var datathree;


					datathree = qs.parse(formData);
					user = datathree['FavID'];
					itemid = datathree['item'];
					console.log(user);
					//console.log(itemid);
					//res.end("datathree=" + user + itemid);
					//res.end


					var query = { "loginid": user, "item": itemid }; //json
					//var myobj = {"name":"hello"};
					MongoClient.connect(dbUrl, function (err, db) {
						if (err) throw err;
						var dbo = db.db("apple");
						//var myobj = stringMsg;
						//dbo.collection("Login").insertOne(query, function(err, res) {

						dbo.collection("Item").insertOne(query2, function (err, res) {
							if (err) throw err;
							console.log("1 document inserted");
							//res.end("Account created!!");
							db.close()






							//return response.end(JSON.stringify(result));
						});


					});

				});

			});



		} else {


			res.end("abc");
		}

	}




	else if (/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/javascript");
	} else if (/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/javascript");
	} else if (/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/css");
	} else if (/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/css");
	} else if (/^\/[a-zA-Z0-9\/-]*.jpg$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "image/jpg");
	} else if (/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/javascript");
	} else if (/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/map");
	} else if (/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/map");
	} else if (/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/map");
	} else if (/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "image/png");
	} else if (/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/ico");
	} else if (/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/font");
	} else if (/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/woff");
	} else if (/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())) {
		sendFileContent(res, req.url.toString().substring(1), "text/woff2");
	} else {
		console.log("Requested URL is: " + req.url);
		res.end();
	}
}).listen(901); //the server object listens on port 8080
console.log("Server is running，time is" + new Date());

function sendFileContent(response, fileName, contentType) {
	fs.readFile(fileName, function (err, data) {
		if (err) {
			response.writeHead(404);
			response.write("Not Found!");
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.write(data);
		}
		response.end();
	});
}