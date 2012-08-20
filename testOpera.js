YUI({
  modules: {
    thxcard: 'thx_card.js',
    require: ['base-base', 'widget', 'substitute', 'array-extras']
  }
}).use( 'thxcard', 'node', 'event', function (Y) {
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
    });

    Y.log('Thx card inited\nset list of imgs...');
    photoClasses = ['.primPhoto', '.secPhoto'];
    thx.set('listOfImgs', photoClasses);
    thx.render();
    //add interactivity to the thx card with event handling
    //      Y.one('#container').on('click', thx.onClick, thx);

    //we 'check all point on the card and check if it is in the photo or note
    var w = 1200,
    h  = 1000,
    deltaIteration = 20,
    pointSize = deltaIteration/2,
    ctx = thx.get('ctx'),
    colorMap = {"-1": "black", "0": "red", "1": "blue"},
    x, y, frameNumber, color;

    function drawPoint (x, y, color) {
          ctx.save();
          ctx.fillStyle = color;
          ctx.fillRect(x, y, pointSize, pointSize);
          ctx.restore();
    }

    for (x = 0; x < w; x = x + deltaIteration) {
      for (y = 0; y < h; y = y + deltaIteration) {
        frameNumber = thx.getElementClicked(x, y);
        drawPoint(x, y, colorMap[frameNumber.toString(10)]);
      } 
    }

  });
});


