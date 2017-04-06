'use strict';
/* 
Smart Mirror DeustoTech
Modulo: SMD-RFIDProfile
 */

const NodeHelper = require('node_helper');
var sys = require('sys');
var ID_read;


    var spawn = require('child_process').spawn;
    var py    = spawn('python', ['/root/SmiWork/modules/SMD-RFIDProfile/MFRC522-python/read.py']);


module.exports = NodeHelper.create({
  start: function () {
    this.started = false
  },



  socketNotificationReceived: function(notification, payload) {
    const self = this;
    if (notification === 'BUTTON_CONFIG' && this.started == false) {     
		const self = this;
		this.config = payload; 
		py.stdout.on('data', function(data){
		var data_2 = data.toString();
		self.sendSocketNotification("USER", data_2);
		});
    };

  }
  
});
