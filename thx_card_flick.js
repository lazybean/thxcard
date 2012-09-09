/*
 *FlickThxCard is extension of ThxCard, with the ability to switch photos (frames) by doing a flick movement.
 *
 */

YUI.add("thxcard-flick", function (Y) {
  "use strict";
  var thx = Y.namespace('thx');


  function FlickFrameMovement () {
    this.initFlickFrameMovement();
  }

  FlickFrameMovement.ATTRS = {};
  FlickFrameMovement.prototype = {
    initFlickFrameMovement: function () {},
    flickMove: function () {}
  };

  thx.FlickThxCard = Y.Base.create('FlixThanksCard', thx.ThxCard, [FlickFrameMovement]);


});
