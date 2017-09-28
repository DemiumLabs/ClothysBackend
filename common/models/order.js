'use strict';

module.exports = function(Order) {

  Order.observe('before save', function(ctx,next) {
    ctx.instance.item((err,item) => {
      if(!item.isSelled){
        item.updateAttribute("isSelled",true).then((result) => {
          next()
        });
      }else{
        next("Ya esta vendido el articulo",null);
      }
    });
  });

  Order.observe('after save', function(ctx,next){
    if(ctx.isNewInstance){
      let Seat = Order.app.models.Seat;

      ctx.instance.item((err,item) => {
        console.log(item);
        Seat.create({price : item.Price, buyerId: ctx.instance.customerId, sellerId: item.customerId}).then((result) => {console.log(result);next();});
      });
    }

  });

};
