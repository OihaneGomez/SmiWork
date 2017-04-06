/* 
SmiWork: Smart Mirror DeustoTech
Modulo: SMD-Advices
MIT Licensed.
 */


var veces1 =0;
var veces2 =0;
var actual;
var comprobar;
var datalog;
var sesion_iniciada;
var n_log=0;
var first=0;
var espejo_detectado=0;

Module.register('SMD-Log',{	
	defaults: {
	},	

	notificationReceived: function(notification, payload) {
	var self = this;
    if (notification === 'LOGIN') {  
		if (sesion_iniciada===1)
		{
			self.sendSocketNotification('logout_user', datalog);
			sesion_iniciada===0;
		}
				datalog = payload.toString();   
				self.sendSocketNotification('login_user', datalog);
				sesion_iniciada=1;
		}

	 if (notification === 'LOGOUT') {     
		datalog = payload.toString();
		self.sendSocketNotification('logout_user', datalog);
		sesion_iniciada=0;
	}
	 if (notification === 'VECES') {     
		datalog = payload.toString();
		self.sendSocketNotification('veces_user', datalog);
	}

	if (notification === 'ENVIROMENT') {
		datalog = payload.toString();
		if (first===0)
			{
			self.sendSocketNotification('enviroment', datalog);
			first=1;
			}
		n_log=n_log+1;
		if(n_log===100)
		{
			self.sendSocketNotification('enviroment', datalog);
			n_log=0;
		}
	
	}
	 if (notification === 'SMARTBAND') {     
		datalog = payload.toString();
		self.sendSocketNotification('smartband_data', datalog);
	}
	
	 if (notification === 'ESPEJO') {
		espejo_detectado=1;      
	}

	 if ((notification === 'CONSEJO'||notification === 'RANKING'||notification === 'DUERME')  && espejo_detectado===1) {
		espejo_detectado=0;      
		self.sendSocketNotification('espejo_interacion');
	}

},

	getDom: function() {
		var wrapper = document.createElement("div");
return wrapper;
		}
	


});
