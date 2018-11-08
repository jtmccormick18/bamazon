const models=require('../models');
const path=require('path');

module.exports = function (app) {

  /**
   * GET the HomePage
   */
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    models.Product.findAll({}).then(function(data){
      res.json(data);
    })
  });
}
