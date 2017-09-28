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

};
