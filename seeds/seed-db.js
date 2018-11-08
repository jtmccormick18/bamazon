const db = require('../models');

// Syncing our sequelize models 
// =============================================================
db.sequelize.sync().then(function() {
  db.Product.bulkCreate([{
    product_name: 'Football',
    department_name: 'Sports',
    price: 50,
    stock_quantity:100
  },{
    product_name: 'Basketball',
    department_name: 'Sports',
    price: 60,
    stock_quantity:80
  },{
    product_name: 'Football Helmet',
    department_name: 'Sports',
    price: 100,
    stock_quantity:50
  },{
    product_name: 'Baseball Bat',
    department_name: 'Sports',
    price: 200,
    stock_quantity:35
  },{
    product_name: 'Basketball Shoes',
    department_name: 'Sports',
    price: 125,
    stock_quantity:100
  },
  {
    product_name: 'Baseball Cleats',
    department_name: 'Sports',
    price: 125,
    stock_quantity:100
  },{
    product_name: 'Reciever Gloves',
    department_name: 'Sports',
    price: 35,
    stock_quantity:80
  },{
    product_name: 'Football Cleats',
    department_name: 'Sports',
    price: 100,
    stock_quantity:200
  },{
    product_name: 'Signed Michael Jordan Basketball',
    department_name: 'Sports',
    price: 10000,
    stock_quantity:1
  },{
    product_name: 'Compression Shorts',
    department_name: 'Sports',
    price: 20,
    stock_quantity:100
  }
]).then(function(data) {
    console.log('Data successfully added!');
  }).catch(function(error) {
    console.log('Error', error)
  })
}).catch(function(error) {
  console.log('Error', error)
});