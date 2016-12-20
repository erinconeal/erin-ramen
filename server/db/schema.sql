create table products_in_cart
  (
    id serial primary key,
    order_id integer references orders,
    food_id integer references food,
    qty integer,
    subtotal decimal(10,2)
  );

create table orders
  (
    id serial primary key,
    order_date timestamp,
    complete boolean,
    cust_id integer references customers
  );

create table food
  (
    id serial primary key,
    food_name varchar(40),
    description text,
    price decimal(10, 2),
    image text,
    food_cat_id integer references food_category,
    user_id integer references users
  );

create table food_category
  (
    id serial primary key,
    category text
  );

create table customers
  (
    id serial primary key,
    name text,
    phone text,
    email text
  );

create table users
  (
    id serial primary key,
    username varchar(50),
    password varchar(50)
  );

insert into food_category
  (category)
  values ('Appetizers');
insert into food_category
  (category)
  values ('Drinks');
insert into food_category
  (category)
  values ('Ramen');
insert into food_category
  (category)
  values ('Rice');
insert into food_category
  (category)
  values ('Sides');


insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Edamame', 'Fresh soybeans in the pod. A popular snack in Japan!', 2.50, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/edamame.jpg', 1, 1);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Seaweed Salad', '', 3.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/seaweed-salad.jpg', 1, 1);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Gyoza', 'Japanese fried dumplings stuffed with ground pork', 4.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/gyoza.jpg', 1, 1);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Fried Chicken', 'Japanese-style fried chicken', 5.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/fried-chicken.jpg1', 1, 1);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Takoyaki', 'Octopus fried in batter balls and topped with a special sauce', 4.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/takoyaki.jpg', 1, 1);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Chicken Katsu', 'Breaded and fried chicken breast', 5.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/Chicken-Katsu.jpg', 1, 1);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('French Fries', 'An American classic', 2.50, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/fries.jpeg', 1, 1);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Fried Oysters', '', 4.50, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/apps/Fried-Oysters.jpg', 1, 1);


insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Shio Tonkotsu', 'Most popular ramen. Pork based soup. Toppings: Chasu pork, flaovred egg, bean sprouts, sliced green onion and seaweed', 7.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/Shio-Tonkotsu-Ramen.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Tokyo Shoyu', 'Chicken based soup. Toppings: Chasu pork, flavored egg, spinach, menma (bamboo shoots), fish cake, sliced green onion and seaweed', 8.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/tokyo-shoyu.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Shoyu Tonkotsu', 'Soy sauce based ramen. Pork based soup. Toppings: Chasu pork, flavored egg, bean sprouts, sliced green onion and seaweed', 7.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/shoyu-tonkotsu.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Chasu Ramen', 'Great for meat lovers. Pork based soup. Toppings: Chasu pork, bean sprouts, sliced green onion', 10.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/chasu-ramen.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Tsukemen (Dipping ramen)', 'Pork based soup, concentrated. Used for dipping. You may add dashi(clear broth) if you would like to create a drinkable soup. Toppings: Chasu pork, flavored egg', 8.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/tsukemen.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Miso Ramen', 'Pork based soup. Toppings: Chasu pork, flavored egg, bean sprouts, cabbage, carrots, kikurage (Japanese mushrooms), kaiware (radish sprouts) and sesame seed', 7.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/miso-ramen.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Spicy Miso Ramen', 'Pork based soup. Toppings: Chasu pork, flavored egg, bean sprouts, cabbage, carrots, kikurage (Japanese mushrooms), kaiware (radish sprouts), sesame seed and chili pepper', 8.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/spicy-miso.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Spicy Shio', 'Pork based soup. Toppings: Chasu pork, flavored egg, bean sprouts, sliced green onion and seaweed. Best with medium wavy noodles', 8.45, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/spicy-shio.jpg', 1, 3);
insert into food
(food_name, description, price, image, user_id, food_cat_id)
values ('Spicy Tokyo Shoyu', 'Chicken based soup. Toppings: Chasu pork, flavored egg, spinach, menma (bamboo shoots), fish cake, sliced green onion and seaweed. Spicy', 8.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/ramen/spicy-tokyo-shoyu.jpg', 1, 3);


insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Chicken Teriyaki', 'Sliced chicken marinated in a sweet soy glaze. Comes with steamed rice, green onions, sesame seeds', 4.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/rice/chicken-teriyaki.jpg', 1, 4);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Spicy Chicken Teriyaki', 'Our signature chicken dish but with a spicy kick. Comes with steamed rice, green onions, sesame seeds', 4.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/rice/spicy-chicken-teriyaki.jpg', 1, 4);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Fried rice', 'Made with vegetables, pork and egg', 4.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/rice/friedrice.jpg', 1, 4);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Pork Curry', 'Japanese-style curry with pork and vegetables. Comes with steamed rice, green onions, sesame seeds', 4.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/rice/pork-curry.jpg', 1, 4);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Pork Chasu Bowl', 'Sliced pork belly marinated in soy sauce. Comes with steamed rice, green onions, sesame seeds', 4.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/rice/pork-chasu-bowl.jpg', 1, 4);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Spicy Tuna Bowl', 'With tuna and spicy mayonnaise. Comes with steamed rice, green onions, sesame seeds', 4.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/rice/spicy-tuna-bowl.jpg', 1, 4);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Chicken Katsu Curry', 'Breaded and fried chicken on top of our curry sauce. Comes with steamed rice, green onions, sesame seeds and complimentary salad', 10.95, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/rice/chicken-katsu-curry.jpg', 1, 4);


insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Steamed Rice', '', 1.00, '', 1, 5);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Salad', 'House salad comes wiht cabbage, shredded carrots, corn, dressed in ponzu sauce (citrus-based sauce)', 1.00, '', 1, 5);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Extra broth', '', 1.00, '', 1, 5);


insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Soft drinks', '', 1.75, '', 1, 2);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Ramune', 'Japanese soda', 2.25, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/drinks/ramune.jpg', 1, 2);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Calpico', 'Japanese uncarbonated soft drink', 2.25, 'https://s3-us-west-2.amazonaws.com/devmtn-personal-proj/images/drinks/calpico.jpg', 1, 2);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Iced green tea', '', 2.00, '', 1, 2);
insert into food
  (food_name, description, price, image, user_id, food_cat_id)
values ('Oolong tea', '', 1.75, '', 1, 2);
