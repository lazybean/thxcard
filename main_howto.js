YUI({
  modules: {
    'thxcard-howto':{ 
      fullpath: 'howto.js',
      require: ['base-build', 'widget', 'node', 'event', 'transition']
    }
  }
}).use('thxcard-howto', function(Y) {
  "use strict";
  var thxHowto = new Y.Thx.Howto();
  thxHowto.render();
  thxHowto.on('finished', function () {Y.log('howto finished'); thxHowto.finish();});
});
