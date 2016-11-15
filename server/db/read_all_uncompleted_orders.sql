-- select * from orders
-- join food
-- on food.id = any(orders.cart)
-- where complete = false
-- select orders.cust_id, orders.cart from orders
-- where complete = false
select * from orders
where complete = false
order by orders.id asc;
