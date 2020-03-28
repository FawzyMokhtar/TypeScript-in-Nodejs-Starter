INSERT INTO categories
    (name)
VALUES('Mobiles'),
    ('Laptops'),
    ('TVs');

INSERT INTO products
    (name, price, "categoryId")
VALUES
    ('Samsung Galaxy S5', 4500, 1),
    ('Samsung Galaxy S6', 5000, 1),
    ('Huawei P10 Lite', 5200, 1),
    ('Huawei P30', 6500, 1),
    ('Huawei P30 Lite', 5800, 1),

    ('Dell Inspiron 5520', 12000, 2),
    ('Dell Precision M6800', 15000, 2),
    ('Toshiba Pro-Book 9099', 7000, 2),
    ('Toshiba Pro-Book 5520', 3500, 2),
    ('HP Z-Book', 11000, 2),

    ('JAC 55 Inch Full HD LED Smart Android TV - 55ASS', 5200, 3),
    ('UnionAir 32 Inch HD LED TV - M-LD-32UN-PB816-EXD', 1900, 3),
    ('Toshiba 32 Inch HD LED TV - 32L2600EA', 3290, 3),
    ('Tornado 32 Inch LED HD TV - Black, 32EL7200E', 3150, 3),
    ('Samsung 32 Inch HD LED Standard TV - UA32K4000', 3550, 3);
