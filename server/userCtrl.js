
// APP //
var app = require('./index');
var db = app.get('db');

// BCRYPT
var bcrypt = require('bcryptjs');

// HASH PASSWORD //
function hashPassword(password) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	return hash;
}

module.exports = {

	// REGISTER USER //
	register: function(req, res, next) {
		var user = req.body;

		// Hash the users password for security
		user.password = hashPassword(user.password);

		db.user_create([user.username, user.password], function(err, user) {
			// If err, send err
			if (err) return res.status(500)
				.send(err);

			// Send user back without password.
			delete user.password;
			res.status(200)
				.send(user);
		});
	},

	// READ USER //
	read: function(req, res, next) {
		User.find(req.query, function(err, result) {
			if (err) return res.status(500)
				.send(err);
			for (var i = 0; i < result.length; i++) {
				delete result[i].password;
			}
			res.status(200)
				.send(result);
		});
	},

	// RETURN CURRENT USER //
	me: function(req, res, next) {
		// If user isnt on the session, then return error status
		if (!req.user) return res.status(401)
			.send('current user not defined');

		// Remove password for security
		var user = req.user[0];

		delete user.password;

		// Return user
		return res.status(200)
			.json(user);
	},

	update: function(req, res, next) {
		User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
			if (err) next(err);
			res.status(200)
				.send('user updated');
		});
	},

	GetAllCustomers: function(req, res, next) {
		db.read_all_customers(function(err, customers) {
			res.status(200).json(customers)
		});
	},

	CreateCustomer: function(req, res, next) {
		console.log(req.body);
		var customers = req.body;
		db.customers.insert({
			cust_name: customers.cust_name,
			phone_num: customers.phone_num,
			email: customers.email
		}, function(err, customer) {
			console.log("success: ", customer, "failure: ", err);
			res.send(customer);
			// db.order_create([customer.id], function(err, order) {
			// 	res.status(200).json(order)
			// });
		})
	}
};
