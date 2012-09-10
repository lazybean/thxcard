YUI({
  modules: {
    thxcard: {
      fullpath: 'thx_card.js',
      require: ['base-base', 'widget', 'substitute', 'array-extras']
    },
    'thxcard-howto':{ 
      fullpath: 'howto.js',
      require: ['base-build', 'widget', 'node', 'event', 'transition', 'button']
    }
  }
}).use('thxcard', 'thxcard-howto', 'node',  'event', 'event-mousewheel', function(Y) {
  "use strict";
  Y.on('domready', function(){
    //we hide the 'waiting' element and show the thx_card container
    Y.one('#waiting').addClass('hidden');
    Y.one('#container').removeClass('hidden');
    var photoClasses,
    thx = new Y.Thx.ThanksCard({
      srcNode: "#container",
      listOfBGs :[
        {
          name: 'test1',
          node: Y.one('#bg_img2'),
          coord: [{x:525, y:250, width:595, height: 600, angle:0.261},
          {x:1255, y:217, width:515, height: 515, angle:0.174}]
        },
        {
          name: 'test2',
          node: Y.one('#bg_img1'),
          coord: [{x:210, y:305, width:320, height: 310, angle:0},
          {x:1185, y:448, width:470, height: 475, angle:0}]
        }]
    }),
    thxHowto = new Y.Thx.Howto();

    Y.log('Thx card inited\nset list of imgs...');
    photoClasses = ['.primPhoto', '.secPhoto'];
    thx.set('listOfImgs', photoClasses);


    thxHowto.render();
    Y.on('thxcard-howto:finished', function () {
      thxHowto.finish(function () {
        thx.render();
      });     
    });
  });
});
