SELECT prod.*, pic.*
FROM products_in_cart pic
JOIN food prod
ON prod.id = pic.food_id
WHERE pic.order_id = $1;
