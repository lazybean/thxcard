/*
*ThxCard-HowTo is a small widget that explain how to use the ThxCard
*
* It ask/explain the user to click on the background and frame before.
*
*/


YUI.add("thxcard-howto", function(Y) {
  "use strict";

  Y.namespace("Thx").Howto = Y.Base.create("thxcard-howto", Y.Widget, [], {


    finish: function (callback) {
     var that = this;
      this.get('contentBox').transition({
        duration: 1, // seconds
        easing: 'ease-out', // CSS syntax
        height: 0,
        //top: '100px',
        opacity: {
          delay: 0.0,
          duration: 1,
          value: 0
        },
        color: {
          delay: 0.0,
          duration: 1.0,
          value: 'rgba(0,0,0,0)'
        }
      }, function () {
        that.hide();
        that.destroy();
        callback();
      });

    },
    destructor: function () {
      this.get('contentBox').get('children').remove(true);
    },

    initializer: function () {

      this.after('clickedChange', this.checkHowtoEnd, this);
      this.publish('finished', {
        emitFacade: true,
        broadcast: 2
      });
    },

    renderUI: function () {
      this.background = Y.Node.create('<div class="background">Le fond change en cliquant dessus. Clique s\'il te plaît.</div>');
      this.frame = Y.Node.create('<div class="frame">Les photos contenues dans les cadres changent aussi lors d\'un click.  Essayez...</div>');
      this.background.append(this.frame);
      this.get('contentBox').append(this.background); 
    },

    bindUI: function() {
      this.background.on('click', this.handleBackroundClick, this );
      this.frame.on('click', this.handleFrameClick, this );
      this.after('clickedChange', this.syncUI, this);

    },

    syncUI: function() {
      this.toggleClicked();   
    },

    handleBackroundClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setAsClicked('background');
    },

    handleFrameClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setAsClicked('frame');
    },

    /**
    * For the frame and backgound, add or remove the 'clicked' class depending on clicked.framed respectively clicked.background is true or not.
    *
    *@method toggleClicked
    *
    */
    toggleClicked: function () {
      Y.each(this.get('clicked'), function (v, k) {
        if (v) {
          this[k].addClass('clicked');
        } else {

          this[k].removeClass('clicked');
        }
      }, this);
    },    

    checkHowtoEnd: function () {
      // (there is one that is not clicked is false ) == (all clicked)
      var areAllClicked = ! Y.some(this.get('clicked'), function (v, k) {
        return !v;
      }, this);
      if ( areAllClicked ) {
        this.fire('finished'); 
      }  
    }, 


    /**
    * Set the value clicked.target to true
    *
    *@method setAsClicked
    *param {string} target the element that was clicked
    *
    */
    setAsClicked: function(target) {
      this.set('clicked.'+target, true);
    }



  },{

    ATTRS:{
      clicked: {
        value: {
          background:false,
          frame: false
        }
      }

    }

  });

}, "1.0.0", {requires: ["base-build", "widget", "node", "event", "transition"]});
