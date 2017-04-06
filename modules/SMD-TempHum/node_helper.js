'use strict';
/* 
Smart Mirror DeustoTech
SMD-TempHum
 */

const NodeHelper = require('node_helper');
var sys = require('sys');
var ID_read;


    var spawn = require('child_process').spawn;
    var py    = spawn('python', ['/root/MagicMirror/modules/SMD-TempHum/DHT11_Python/TempHumRead.py']);


module.exports = NodeHelper.create({
  start: function () {
    this.started = false
  },



  socketNotificationReceived: function(notification, payload) {
    const self = this;
    if (notification === 'CONFIG' && this.started == false) {     
		const self = this;
		this.config = payload; 
		py.stdout.on('data', function(data){

		//console.log("node empieza");
		//console.log("capturado en array" + data);
		var data_enviar=data.toString();
		//console.log("capturado temp  " + str(data[0]));
		//console.log("capturado hum  " +str(data[1]));
		//console.log("node acaba");
		self.sendSocketNotification("DATA", data_enviar);
		});
    };

  }
  
});
