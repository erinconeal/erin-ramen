INSERT INTO orders (cust_id, products, complete)
VALUES ($1, $2, false)
RETURNING *;
