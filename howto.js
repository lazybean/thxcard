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
      this.background = Y.Node.create('<div class="background"><strong>TUTORIAL:</strong> Le fond change en cliquant dessus. Clique s\'il vous plaît. Essayez...<br /><a><strong>說明：</strong>請在大方框內點擊以交換背景圖片</a></div>');
      this.frame = Y.Node.create('<div class="frame frame1">Les photos contenues dans les cadres changent aussi lors d\'un click.<br/><a>請在小方框內點擊來換下一張照片</a></div>');
      this.background.append(this.frame);
      this.get('contentBox').append(this.background); 
      this.get('contentBox').append(Y.Node.create('<button id="skipHowto">Je connais | 跳過說明</button>')); 
      this.skipButton = new Y.Button({
        srcNode: "#skipHowto"
      });
      this.skipButton.on('click', function (e) {
        this.fire('finished');
      },
      this);
      this.skipButton.render();
    },

    bindUI: function() {
      this.background.on('click', this.handleBackroundClick, this );
      this.frame.on('click', this.handleFrameClick, this );
      this.frame.on('contextmenu', this.handleFrameRightClick, this );

    },

    syncUI: function() {
    },

    frameSecondStep: function () {
      this.setAsClicked('frame');
      this.frame.set('text', 'Yoopi! Encore... 再試一次');
      this.frame.removeClass('frame1');
      this.frame.addClass('frame2');
    },
    frameThirdStep: function () {
      this.setAsClicked('frame');
      this.frame.set('innerHTML', 'Oh non, je suis tout seul, reviens en arrière avec un click droit. <br /><a>點擊右鍵返回前一張照片</a>');
      this.frame.removeClass('frame2');
      this.frame.addClass('frame3');
    },

    frameFourthStep: function () {
      this.setAsClicked('frame');
      this.frame.set('text', 'Ouf! 恭喜你完成一半練習!');
      this.frame.removeClass('frame3');
      this.frame.addClass('frame2');
    },

    handleBackroundClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      if(this.get('clicked.background') ===  0) {
         this.setAsClicked('background');
         this.background.addClass('clicked');
      }
    },

    handleFrameClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      switch (this.get('clicked.frame') ) {
      case(0):
        this.frameSecondStep();
        break;

      case(1):
        this.frameThirdStep();
        break;
      default:
      break;
      }
    },

    handleFrameRightClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      switch (this.get('clicked.frame') ) {
      case(2):
        this.frameFourthStep();
        break;
      default:
      break;
      }
    },
    checkHowtoEnd: function () {
      var completedSteps = this.get('clicked');
      if (completedSteps.background === 1 && completedSteps.frame === 3) {
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
      var newClickedValue = this.get('clicked.' + target) + 1;
      this.set('clicked.'+target, newClickedValue);
    }

  },{

    ATTRS:{
      clicked: {
        value: {
          background:0,
          frame: 0
        }
      }
    }

  });

}, "1.0.0", {requires: ["base-build", "widget", "node", "event", "transition", "button"]});
