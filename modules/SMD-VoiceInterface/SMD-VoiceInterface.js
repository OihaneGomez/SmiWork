/* 
SmiWork: Smart Mirror DeustoTech
Modulo: SMD-VoiceInterface
MIT Licensed.
 */

var awake = 1;
var radio = 0;
var activo =0;
var trafico =0;
var cargando =0;
var currentprofile='default';
var ranking=0;
var dormido=0;

Module.register("SMD-VoiceInterface",{



	defaults: {
		text: "",
		animationSpeed: 1000,
		personalmodules:'',
		models: [
				{
				description: ""
				},	
			]
	},
	
	start: function() { 
		MM.getModules().withClass('SMD-DefaultAdvices').exceptModule(this).exceptWithClass().enumerate(function(module) {
		module.hide(3000);
		});
        this.sendSocketNotification("CONNECT", {});
		this.config.text = "Diga ESPEJO para control por voz"
    	},



	notificationReceived: function(notification, callback) {
		var self = this;


		if (notification === 'CURRENT_PROFILE'){
			if (callback.toString() === 'default'){
				currentprofile = callback.toString();
			}else{
			currentprofile = callback.toString()+' default';
			}

		trafico=0; 
				MM.getModules().withClass('SMD-DefaultAdvices SMD-Advices').exceptModule(this).exceptWithClass().enumerate(function(module) {
				module.hide(3000);
				});
		}

		if (cargando===0){


				MM.getModules().withClass('SMD-DefaultAdvices SMD-ActiveCompetition').exceptModule(this).exceptWithClass().enumerate(function(module) {
				module.hide(3000);
				});

		}	

		if (notification === "ESPEJO"){
			activo = 1;
			console.log('Empieza a contar' + activo);
			this.updateDom(this.config.animationSpeed);
			setTimeout(function(){ 
				activo = 0; 
				console.log('Ha esperado 5 segundos'+ activo);
				self.updateDom(self.config.animationSpeed);
			}, 4000);			
		}

		if (notification === "DUERME" && activo==1){
			activo = 0;
			dormido=1;
			this.config.text = "Diga ESPEJO: Despierta para activar de nuevo";
			this.updateDom(this.config.animationSpeed);
			MM.getModules().exceptModule(this).exceptWithClass('SMD-VoiceInterface').enumerate(function(module) {
			module.hide(3000);
			});

		}
			
		if (notification === "DESPIERTA" && activo==1){
			activo = 0;
			dormido=0;
			this.config.text = "Diga ESPEJO para control por voz";
			this.updateDom(this.config.animationSpeed);
			MM.getModules().withClass(currentprofile).exceptModule(this).exceptWithClass('SMD-DefaultAdvices SMD-Advices SMD-ActiveCompetition').enumerate(function(module) {
			module.show(3000);
			});
		}



		if (notification === "CONSEJO" && activo==1){
			activo = 0;
			MM.getModules(currentprofile).enumerate(function(module) {
			module.hide(1000);
			});
			setTimeout(function(){
				if (currentprofile==='default'){
					MM.getModules().withClass('SMD-DefaultAdvices').exceptModule(this).exceptWithClass().enumerate(function(module) {
					module.show(3000);
					});
				}else{
					MM.getModules().withClass('SMD-Advices').exceptModule(this).exceptWithClass().enumerate(function(module) {
					module.show(3000);
					});
				}
			}, 1000);

			setTimeout(function(){
				MM.getModules().withClass('SMD-DefaultAdvices SMD-Advices').exceptModule(this).exceptWithClass().enumerate(function(module) {
				module.hide(2000);
				});
				console.log("SET TIMEOUT")
				setTimeout(function(){
				MM.getModules().withClass(currentprofile).exceptModule(this).exceptWithClass('SMD-DefaultAdvices SMD-Advices SMD-ActiveCompetition').enumerate(function(module) {
				module.show(2000);
				});
				console.log("SET TIMEOUT")
			}, 1500);
			}, 8000);
				

			awake = 0;

		}

		if (notification === "VOLVER" && activo==1){
			activo = 0;
			cargando=0;
			this.config.text = "Diga ESPEJO para control por voz";
			this.updateDom(this.config.animationSpeed);
			MM.getModules().withClass(currentprofile).exceptModule(this).exceptWithClass('SMD-DefaultAdvices SMD-Advices SMD-ActiveCompetition').enumerate(function(module) {
			module.show(3000);
			});
				MM.getModules().withClass('SMD-ActiveCompetition').exceptModule(this).exceptWithClass().enumerate(function(module) {
				module.hide(1000);
				});
			awake = 0;
			ranking=0;
		}
		if (notification === "RANKING" && activo==1){
			activo = 0;
			ranking=1;
			cargando=1;

			MM.getModules().withClass('compliments').exceptModule(this).exceptWithClass().enumerate(function(module) {
			module.hide(500);
			});
			this.config.text = "Diga ESPEJO: Volver para salir";
			this.updateDom(this.config.animationSpeed);
			setTimeout(function(){
			MM.getModules().withClass('SMD-ActiveCompetition').exceptModule(this).exceptWithClass().enumerate(function(module) {
			module.show(1000);
			});
			}, 1000);
			awake = 0;
		}
	},



	socketNotificationReceived: function(notification) {
   	
   	},


	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "regular bright";
		wrapper.innerHTML = this.config.text;

		var symbolWrapper =  document.createElement("div");
		symbolWrapper.className = "fa fa-stack";
		wrapper.appendChild(symbolWrapper);

		if (activo===1) {
			var symbol = document.createElement("i");
			symbol.className = "fa fa-microphone fa-stack-1x";
			symbolWrapper.appendChild(symbol);

			if (trafico===0 && radio===0 && ranking===0 && dormido===0){
				var models = this.config.models;
				models.forEach(function(model) {
				    var nombre_div = document.createElement("div");
				    var description_div = document.createElement("div");
				    nombre_div.innerHTML = model.nombre;
				    nombre_div.className = "small bright bold";
				    description_div.innerHTML = model.description;
				    description_div.className = "small bright light";
				    wrapper.appendChild(nombre_div);
				    wrapper.appendChild(description_div);
				}, this);
			}
		} 

		
		
		return wrapper;
	}
});


