/* 
Smart Mirror DeustoTech
Modulo: SMD-TempHum
 */
var pasos=0;
var distancia=0;
var porcentaje;
var array_log= [0,0,0,0]; //objetivo, pasos, km, porcentaje
var user;
var ninguna=0;

Module.register("SMD-SmartBand", {

  defaults: {
		Objetivo:10000,
		Altura:160
  	},


	getStyles: function() {
		return ["SMD-SmartBand.css"];
	},
	
  start: function() {
    Log.info('Starting module: ' + this.name);
    this.sendSocketNotification('CONFIG', this.config);
    this.loaded=false;
  },

	notificationReceived: function(notification, payload) {
	var self = this;
    if (notification === 'READ_BLE') {
		var mac = payload.toString();
		console.log("--------------READ_BLE-------------"+ mac);
		self.sendSocketNotification('read_smartband', mac);
	}
	if (notification === 'DELETE_BLE') {
		console.log("--------------DELETE_BLE-------------"+ mac);
		this.loaded=false;
		ninguna=0;
		this.updateDom();
		pasos=0;
	}

},

  socketNotificationReceived: function(notification, payload) {
    if (notification === "DATA") {
		console.log("-----------------DATA---------------------");
		
		console.log(payload);
		console.log("Ninguna:"+ninguna)
		var comparar=payload.toString();
		var comparar2=Number(comparar);
		console.log("-----------------COMPARARA---------------------"+ comparar2);
		if(comparar==100000){
			console.log("-----------------no encontrada---------------------");
			ninguna=1;
			console.log("Ninguna:"+ninguna)
			this.loaded=true;
			this.updateDom();
//
			//this.sendNotification('SINDATOS');
//
			}
		else{
		//	this.loaded=true;
			ninguna=0;
			console.log("Ninguna:"+ninguna)
			pasos=payload;
			console.log(pasos);
			distancia=(pasos*this.config.Altura*0.414/100000).toFixed(2);
			console.log(distancia);
			if (pasos >= this.config.Objetivo) {
				porcentaje=100;
			} else {
				porcentaje= Math.round(pasos / this.config.Objetivo * 100);
				console.log(porcentaje);
				console.log(this.config.Objetivo);
			}
			this.loaded=true;
			console.log("DETECTCION"+ ninguna);
			this.updateDom();
			array_log[0]=this.config.Objetivo;
			array_log[1]=pasos;
			array_log[2]=distancia;
			array_log[3]=porcentaje;
			send_log=array_log.toString();
			this.sendNotification('SMARTBAND', send_log);
			}
    }
  },




	numberWithCommas: function(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},


  getDom: function() {	
    	
    	var wrapper = document.createElement("div");
    	
		wrapper.className = "regular medium";
    	var header = document.createElement("header");
        header.innerHTML = "Actividad física";
        wrapper.appendChild(header);
		//return wrapper;
		if (!this.loaded) {
		var cargando = document.createElement("div");
			cargando.innerHTML = ("Buscando SmartBand...");
			cargando.className = "bright small";
			wrapper.appendChild(cargando);
			//return wrapper;
		}
		

		
		if(this.loaded) {
		if (ninguna===1) {
		var none = document.createElement("div");
			none.innerHTML = ("Ninguna SmartBand detectada");
			none.className = "bright small";
			wrapper.appendChild(none);
			//return wrapper;
		}
		
		if (ninguna===0) 
		{
		console.log("-----------------ELSE---------------------");
		iconPath = '/img/stepsWhite.png';
		var icon = document.createElement("img");
		var text = document.createElement("div");
		var userData = document.createElement("div")
		var suffix = document.createElement("div");
		var progress = document.createElement("div");
		var bar = document.createElement("div");
		
		icon.className = 'fitbiticon';
		icon.src = 'modules/' + this.name + iconPath;
		iconPath = '/img/distanceWhite.png';
		var icon_d = document.createElement("img");
		icon_d.className = 'fitbiticon';
		icon_d.src = 'modules/' + this.name + iconPath;



		userData.className = 'normal medium bright';
		suffix.className = "dimmed small"
		userData.innerHTML = pasos;
		suffix.innerHTML = ' Pasos \u00a0 \u00a0';
		userData.style.display = 'inline-block';
		suffix.style.display = 'inline-block';
	

		progress.className = 'progbarbkg';
		bar.className = 'progbar';
		bar.style.width = porcentaje + '%';
		progress.appendChild(bar);


		wrapper.appendChild(icon);
		
		espacio = document.createTextNode("\u00a0 \u00a0 \u00a0");
		wrapper.appendChild(espacio);
		wrapper.appendChild(icon_d);
		espacio2 = document.createTextNode("\u00a0 \u00a0");
		wrapper.appendChild(espacio2);
		

		text.appendChild(userData);
		text.appendChild(suffix);
		wrapper.appendChild(text);

		// Progress bar

		wrapper.appendChild(progress);
		
		wrapper.style.display = 'inline-block';
		wrapper.style.paddingLeft = '5px';
		wrapper.style.paddingRight = '5px';



///////////////////////

		var text_d = document.createElement("div");
		var userData_d = document.createElement("div")
		var suffix_d = document.createElement("div");
		var progress_d = document.createElement("div");
		var bar_d = document.createElement("div");
		
		


		userData_d.className = 'normal medium bright';
		suffix_d.className = "dimmed small"
		
		userData_d.innerHTML = distancia;
		suffix_d.innerHTML = ' \u00a0 Km \u00a0';

		userData_d.style.display = 'inline-block';
		suffix_d.style.display = 'inline-block';
	

		text.appendChild(userData_d);
		text.appendChild(suffix_d);
		wrapper.appendChild(text_d);


		wrapper.style.display = 'inline-block';
		wrapper.style.paddingLeft = '5px';
		wrapper.style.paddingRight = '5px';

//return wrapper;


}
}

/////////////////////

//		return wrapper;

return wrapper;
    }
    
});


