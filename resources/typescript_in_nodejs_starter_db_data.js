/*
 * Use yor mongo-shell to seed the following data.
 * Consider creating and connecting to the database.
 * >> use typescript_in_nodejs_starter_db
 */

db.categories.insertMany([
  {
    _id: ObjectId('5e83c044adcbbabe44e1aed9'),
    name: 'Mobiles'
  },
  {
    _id: ObjectId('5e83c081adcbbabe44e1aeda'),
    name: 'Laptops'
  },
  {
    _id: ObjectId('5e83c081adcbbabe44e1aedb'),
    name: 'TVs'
  }
]);

db.products.insertMany([
  {
    name: 'Samsung Galaxy S5',
    price: 4500.0,
    category: ObjectId('5e83c044adcbbabe44e1aed9')
  },
  {
    name: 'Samsung Galaxy S6',
    price: 5000.0,
    category: ObjectId('5e83c044adcbbabe44e1aed9')
  },
  {
    name: 'Huawei P10 Lite',
    price: 5200.0,
    category: ObjectId('5e83c044adcbbabe44e1aed9')
  },
  {
    name: 'Huawei P30',
    price: 6500.0,
    category: ObjectId('5e83c044adcbbabe44e1aed9')
  },
  {
    name: 'Huawei P30 Lite',
    price: 5800.0,
    category: ObjectId('5e83c044adcbbabe44e1aed9')
  },

  {
    name: 'Dell Inspiron 5520',
    price: 12000.0,
    category: ObjectId('5e83c081adcbbabe44e1aeda')
  },
  {
    name: 'Dell Precision M6800',
    price: 15000.0,
    category: ObjectId('5e83c081adcbbabe44e1aeda')
  },
  {
    name: 'Toshiba Pro-Book 9099',
    price: 7000.0,
    category: ObjectId('5e83c081adcbbabe44e1aeda')
  },
  {
    name: 'Toshiba Pro-Book 5520',
    price: 3500.0,
    category: ObjectId('5e83c081adcbbabe44e1aeda')
  },
  {
    name: 'HP Z-Book',
    price: 11000.0,
    category: ObjectId('5e83c081adcbbabe44e1aeda')
  },
  {
    name: 'JAC 55 Inch Full HD LED Smart Android TV - 55ASS',
    price: 54711.0,
    category: ObjectId('5e83c081adcbbabe44e1aedb')
  },
  {
    name: 'UnionAir 32 Inch HD LED TV - M-LD-32UN-PB816-EXD',
    price: 5200.0,
    category: ObjectId('5e83c081adcbbabe44e1aedb')
  },
  {
    name: 'Toshiba 32 Inch HD LED TV - 32L2600EA',
    price: 1900.0,
    category: ObjectId('5e83c081adcbbabe44e1aedb')
  },
  {
    name: 'Tornado 32 Inch LED HD TV - Black, 32EL7200E',
    price: 3290.0,
    category: ObjectId('5e83c081adcbbabe44e1aedb')
  },
  {
    name: 'Samsung 32 Inch HD LED Standard TV - UA32K4000',
    price: 3150.0,
    category: ObjectId('5e83c081adcbbabe44e1aedb')
  }
]);
