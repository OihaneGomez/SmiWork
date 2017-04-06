/* 
SmiWork: Smart Mirror DeustoTech
Modulo: SMD-TempHum
MIT Licensed.
 */

Module.register("SMD-TempHum", {

  defaults: {

  },

  start: function() {
    this.temperature = null;
    this.humidity = null;
	this.light = null;
    Log.info('Starting module: ' + this.name);
    this.sendSocketNotification('CONFIG', this.config);
    this.loaded=false;
  },


  socketNotificationReceived: function(notification, payload) {
    if (notification === "DATA") {
	cadena=payload.split(",");
      	this.temperature = cadena[0];
      	this.humidity = cadena[1];
		this.light = cadena[2];
		this.sendNotification('ENVIROMENT', payload);
	this.loaded=true;
      this.updateDom();

    }
  },




  getDom: function() {	
    	
    	var wrapper = document.createElement("div");
    	wrapper.className = "light small";
    	
		if (!this.loaded) {
			wrapper.innerHTML = "Loading ...";
			wrapper.className = "bright small";
			return wrapper;
		}
    		var header = document.createElement("header");
        	header.innerHTML = "Condiciones Interior";
        	wrapper.appendChild(header);
		var list = document.createElement("ul");
		list.classList.add("fa-ul");
		var temperature_item = document.createElement("li");
		var temperature_symbol =  document.createElement("i");
		temperature_symbol.classList.add("fa", "fa-li", "fa-home");
		temperature_item.appendChild(temperature_symbol);
		temperature_item.className = "smallmedium bright regular";
		temperature_item.appendChild(document.createTextNode("Temperatura \u00a0" + this.temperature + "°C"));
		list.appendChild(temperature_item);
		var humidity_item = document.createElement("li");
		var humidity_symbol =  document.createElement("i");
		humidity_symbol.classList.add("fa", "fa-li", "fa-tint");
		humidity_item.appendChild(humidity_symbol);
		humidity_item.className = "smallmedium bright regular";
		humidity_item.appendChild(document.createTextNode("Humedad \u00a0 " + this.humidity + "%"));
		list.appendChild(humidity_item);
		var light_item = document.createElement("li");
		var light_symbol =  document.createElement("i");
		light_symbol.classList.add("fa", "fa-li", "fa-lightbulb-o");
		light_item.appendChild(light_symbol);
		light_item.className = "smallmedium bright regular";
		light_item.appendChild(document.createTextNode("Luminosidad: \u00a0 " + this.light + "Lux"));
		list.appendChild(light_item);
		wrapper.appendChild(list);
		return wrapper;


    }
    
});


