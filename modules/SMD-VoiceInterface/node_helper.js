'use strict';
const NodeHelper = require('node_helper');
const exec = require('child_process').exec;
var timer;
var radio=0;
//function initialize() {
//}
//(function(){
//	initialize();
//			autosleep();
//})();


module.exports = NodeHelper.create({
  start: function() {
		this.started = false;
  }, 
 
  socketNotificationReceived: function(notification) {

	if (notification === "CONNECT") {
			clearTimeout(timer);
			//this.autosleep();
	}
    if (notification === 'APAGAR') {
            exec("/opt/vc/bin/tvservice -o", null);
			clearTimeout(timer);
	}
	if (notification === 'ENCENDER') {
		exec("/opt/vc/bin/tvservice --preferred && sudo chvt 6 && sudo chvt 7", null);
		exec("/opt/vc/bin/tvservice -p", null);
		//exec(“sudo /bin/chvt 6 && sudo /bin/chvt 7”, null);
		//exec("/bin/fbset -depth 8 && /bin/fbset -depth 16 ", null);
      		//exec("/usr/bin/xrefresh",null);
		clearTimeout(timer);
		//this.autosleep();
	}

		if (notification === "RADIO") {
			if (radio===0){
				exec("sudo /root/MagicMirror/modules/SMD-VoiceInterface/Estaciones/los40.sh", null);
				radio = 1;
			}
			else{
				exec("sudo pkill mpg123", null);
				radio = 0;
				}	
	}


  },
/*
  autosleep: function(){
	  var self = this;
	  timer=setTimeout(function(){
				exec("/opt/vc/bin/tvservice -o", null);
			    self.sendSocketNotification("autosleep", {});
			},  1000*60*1000);
  }
*/
});
