var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session');
const config = require('./server_config');

var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
  connectionString: massiveUri
})
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/dist', express.static(__dirname + './../dist'));
app.use(express.static(__dirname + './../public'));

app.set('db', massiveServer);
var db = app.get('db');

var passport = require('./passport');
var foodCtrl = require('./controllers/foodCtrl');
var UserCtrl = require('./controllers/userCtrl');
var orderCtrl = require('./controllers/orderCtrl');
var productCtrl = require('./controllers/productCtrl');

var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) return res.status(401)
		.send();
	return next();
};

// Session and passport //
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
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
app.delete('/deleteorder/:id', orderCtrl.deleteOrder)
//ALEX COMMMENTED THIS OUT
// app.get('/api/order/completed/:userid', orderCtrl.getUserHistory);
//ALEX MADE CHANGES//
app.get('/get/order/:phone_num', orderCtrl.getOrderTableId);

// CHANGE MENU //
app.get('/categories', foodCtrl.GetAllCategories);
app.post('/addfood', foodCtrl.CreateFood);
app.post('/addcategory', foodCtrl.CreateCategory);
app.put('/update/:id', foodCtrl.Update);
app.delete('/deletefood/:id', foodCtrl.Delete);

var port = config.serverPort;
app.listen(port, function() {
  console.log('Server up on port', port);
})
