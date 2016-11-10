SELECT *
FROM orders
WHERE cust_id = $1 AND complete = false;
