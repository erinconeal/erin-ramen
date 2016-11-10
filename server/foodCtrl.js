var app = require('./index');
var db = app.get('db');

module.exports = {

  GetAll: function(req, res, next) {
    db.read_all_food(function(err, food) {
      res.status(200).json(food)
    });
  },

  GetOne: function (req, res, next) {
    var item = req.params;
    db.read_one_food_item([item.id], function(err, food) {
      res.status(200).json(food)
    })
  },

  CreateFood: function (req, res, next) {
    console.log("ADDING FOOD: ", req.body);
    var new_item = req.body;
    db.create_food([new_item.food_name, new_item.description, new_item.price, new_item.image], function(err, food) {
      console.log(err);
      db.read_all_food(function(err, food) {
        res.status(200).send(food);
      })
    })
  },

  CreateCategory: function (req, res, next) {
    var new_category = req.body
    db.create_food_cat([new_category.category], function(err, categories) {
      db.read_categories(function(err, categories) {
        res.status(200).send(categories)
      })
    })
  },

  Update: function (req, res, next) {
    var item = req.body
    db.update_food([req.params.id, item.food_name, item.description, item.price, item.image, item.food_cat_id], function(err, food) {
      res.status(200).json(food)
    })
  },
  Delete: function (req, res, next) {
    //request needs to be http://localhost:3000/deletefood?id=33
    db.delete_food([req.params.id], function(err, food) {
      console.log(food);
      res.status(200).json(food)
    })
  }
}
