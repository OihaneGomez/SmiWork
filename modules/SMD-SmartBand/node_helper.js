'use strict';
/* 
Smart Mirror DeustoTech
SMD-TempHum
 */

const NodeHelper = require('node_helper');
var sys = require('sys');
var ID_read;
var data_enviar=0;

    
module.exports = NodeHelper.create({
  start: function () {
    this.started = false
  },



  socketNotificationReceived: function(notification, payload) {
    const self = this;
    if (notification === 'read_smartband' && this.started == false) {   
		const self = this;
		var mac = payload; 
		console.log("mac "+mac)
		switch (mac){
			case '88:0F:10:2E:5C:8F':
				var spawn = require('child_process').spawn;
    			var py    = spawn('python', ['/root/MagicMirror/modules/SMD-SmartBand/Miband1.py']);  
			break;

			case 'C8:0F:10:25:D3:C1':
				var spawn = require('child_process').spawn;
    			var py    = spawn('python', ['/root/MagicMirror/modules/SMD-SmartBand/Miband2.py']);  
			break;
			case 'C8:0F:10:26:03:B9':
				var spawn = require('child_process').spawn;
    			var py    = spawn('python', ['/root/MagicMirror/modules/SMD-SmartBand/Miband3.py']);  
			break;
			case 'C8:0F:10:26:03:3F':
				var spawn = require('child_process').spawn;
    			var py    = spawn('python', ['/root/MagicMirror/modules/SMD-SmartBand/Miband4.py']);  
			break;


		}

		//console.log(payload.toString());
		
		py.stdout.on('data', function(data){
		//console.log("capturado en array" + data);
		data_enviar=data.toString();
		//console.log("Pasos " + data_enviar);
		self.sendSocketNotification("DATA", data_enviar);
		});
    };

  }
  
});
