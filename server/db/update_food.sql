update food
  set food_name = $2, description = $3, price = $4, image = $5, food_cat_id = $6
  where id = $1;
