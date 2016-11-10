var app = require('./index');
var db = app.get('db');

module.exports = {
	createOrder: function(req, res, next) {
		console.log("createOrder: ", req.body);
		db.orders.insert({
			cust_id: req.params.userid,
			cart: req.body.cart,
			complete: false
		}, function(err, order) {
			if (err) {
				return res.status(500)
					.send(err);
			}
			res.status(200)
				.send(order);
		});
	},
	completeOrder: function(req, res, next) {
		db.order_complete([req.params.orderid], function(err, order) {
			if (err) {
				return res.status(500)
					.send(err);
			}
			next();
		});
	},
	getUserOrder: function(req, res, next) {
		var completeOrder = {};
		db.order_by_cust([req.params.userid], function(err, order) {
			if (err) {
				return res.status(500)
					.send(err);
			}

			completeOrder.order = order[0];
			db.product_cart_find([completeOrder.order.id], function(err, products) {
				if (err) {
					return res.status(500)
						.send(err);
				}

				completeOrder.products = products;
				res.status(200)
					.send(completeOrder);
			});
		});
	},
	getUserHistory: function(req, res, next) {
		db.order_history_by_cust([req.params.userid], function(err, orders) {
			if (err) {
				return res.status(500)
					.send(err);
			}
			res.status(200)
				.send(orders);
		});
	},
	getUncompletedOrders: function(req, res, next) {
		db.read_all_uncompleted_orders(function(err, orders) {
			res.status(200).json(orders)
		});
	},
	//ALEX MADE CHANGES
	getOrderTableId: function(req,res,next){
		db.get_table_id([req.params.phone_num], function(err, id){
			if(err){
				console.log("THE WORST " + err);
			}
			res.status(200).json(id);
		})
	}
};
