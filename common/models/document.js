'use strict';

module.exports = function(Document) {


     Document.observe('before save',(ctx,next)=>{
          // console.log('\x1b[36m%s\x1b[0m','before save Document');
           Document.findOne({where: {shipOrderId: ctx.instance.shipOrderId, name: ctx.instance.name},order:'version DESC'}, (err, document) => {
               ctx.instance.version =  (document) ? document.version +1 : 1;
               next();
           });
           //next();
    });

};
