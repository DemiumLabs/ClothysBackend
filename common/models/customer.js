'use strict';

module.exports = function(Customer) {

  Customer.observe('after save', function(ctx,next){
    if(ctx.isNewInstance){
      let Seat = Customer.app.models.Seat;

      Seat.create({price: 1000, buyerId: ctx.instance.id},(err,seatInstance ) => {
        if(err) next(err,null);
        next();
      });
    }
  });

};
