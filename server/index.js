var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session');


var massiveServer = massive.connectSync({
  connectionString: 'postgres://postgres:postgres@localhost/ramen'
});
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));

app.set('db', massiveServer);
var db = app.get('db');
// console.log(db);
var foodCtrl = require('./foodCtrl');
var passport = require('./passport');
var UserCtrl = require('./userCtrl');
var orderCtrl = require('./orderCtrl');
var productCtrl = require('./productCtrl');
var serverConfig = require('./server_config')

var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) return res.status(401)
		.send();
	return next();
};

// Session and passport //
app.use(session({
	secret: 'fjdal;fdsa',
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Endpoints //
app.post('/login', passport.authenticate('local', {
	successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
	req.logout();
	return res.status(200)
		.send('logged out');
});
app.post('/register', UserCtrl.register);
app.get('/user', UserCtrl.read);
app.get('/me', isAuthed, UserCtrl.me);

// MENU //
app.get('/menu', foodCtrl.GetAll);
app.get('/menu/:id', foodCtrl.GetOne);

// PRODUCTS IN CART //
app.get('/api/in/cart/:cartid', productCtrl.getInCart);
app.post('/api/add/item/cart/:cartid', productCtrl.addToCart);
app.put('/api/update/qty/:productid', productCtrl.updateProductInCart);
app.delete('/api/delete/item/cart/:productid', productCtrl.deleteCartItem);

// CUSTOMERS //
app.post('/createcustomer', UserCtrl.CreateCustomer);
app.get('/customers', UserCtrl.GetAllCustomers);

// ORDER //
app.post('/api/order/:userid', orderCtrl.createOrder);
//ALEX COMMENTED THIS OUT
// app.put('/api/order/complete/:orderid/:userid', orderCtrl.completeOrder, orderCtrl.createOrder);
app.get('/api/order/:userid', orderCtrl.getUserOrder);
app.get('/orderstofill', orderCtrl.getUncompletedOrders);
//ALEX COMMMENTED THIS OUT
// app.get('/api/order/completed/:userid', orderCtrl.getUserHistory);
//ALEX MADE CHANGES//
app.get('/get/order/:phone_num', orderCtrl.getOrderTableId);

// CHANGE MENU //
app.post('/addfood', foodCtrl.CreateFood);
app.post('/addcategory', foodCtrl.CreateCategory);
app.put('/update/:id', foodCtrl.Update);
app.delete('/deletefood/:id', foodCtrl.Delete);

var port = serverConfig.serverPort;
app.listen(port, function() {
  console.log('Server up on port', port);
})