'use strict';

module.exports = function(Customer) {

  var Promise = require('promise');

  Customer.observe('after save', function(ctx,next){
    if(ctx.isNewInstance){
      let Seat = Customer.app.models.Seat;

      Seat.create({price: 1000, buyerId: ctx.instance.id},(err,seatInstance ) => {
        if(err) next(err,null);
        next();
      });
    }
  });

  Customer.prototype.calculate = function(cb) {
    let Seat = Customer.app.models.Seat;
    let promises = []
    promises.push(Seat.find({where: {buyerId : this.id }}));
    promises.push(Seat.find({where: {sellerId : this.id}}));

    Promise.all(promises).then((result) => {
      let buyers = result[0];
      let sellers = result[1];
      let customerAmount = 0;

      buyers.forEach(buy => customerAmount += buy.price);
      sellers.forEach(sell => customerAmount -= sell.price);
      
      cb(null, customerAmount);
    });

  }

  Customer.remoteMethod('calculate', {
        isStatic: false,
        returns: {arg: 'customerAmount', type: 'number', root: true},
        http: {verb: 'get'}
  });

};
