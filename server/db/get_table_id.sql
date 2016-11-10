SELECT orders.id FROM customers
JOIN orders
ON orders.cust_id = customers.id
WHERE customers.phone_num = $1;
-- $1 is phone number
