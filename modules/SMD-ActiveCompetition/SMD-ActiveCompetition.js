/* 
SmiWork: Smart Mirror DeustoTech
Modulo: SMD-ActiveCompetition
MIT Licensed.
 */
var pasos=0;
var distancia=0;
var porcentaje;
var user;
var ninguna=0;
var pasos_array=[];
var distancia_array=[];
var porcentaje_array=[];
var i_usr;
var presencia_datos=[];
var array_nombres_orden=[];
var array_pasos_orden=[];
var array_porcentaje_orden=[];
var array_presencia_orden=[];
var array_prueba=[];
var comparar=[];
var array_ordenada=[];
var index;
var array_nombres_nueva=[];
var pasos_reordenada=[];
var i_usr_cambiado;
var i_cantidad_datos;


Module.register("SMD-ActiveCompetition", {

  defaults: {
		numero_usuarios:4,
		usr_name:['USR1', 'USR2', 'USR3', 'USR4']
  	},

	getStyles: function() {
		return ["SMD-ActiveCompetition.css"];
		return ["font-awesome.css"];
	},
	
  start: function() {
    Log.info('Starting module: ' + this.name);
    this.sendSocketNotification('CONFIG', this.config);
    this.loaded=false;
	for (var i = 0; i < this.config.numero_usuarios; i++) {
		presencia_datos[i]=0;
		array_pasos_orden[i]=0;
		pasos_reordenada[i]=0;
		array_porcentaje_orden[i]=0;
	}
		array_nombres_nueva	=this.config.usr_name.slice(0);
	
  },


  notificationReceived: function(notification, payload){
	var self = this;
	function swap(input, index_A, index_B) {
		var temp = input[index_A];
	 
		input[index_A] = input[index_B];
		input[index_B] = temp;
	}

    if (notification === 'LOGIN') { 
			datalog = payload.toString();
            user=datalog;
			for (var i = 0; i < this.config.numero_usuarios; i++) {
				if (user===this.config.usr_name[i]){
					i_usr=i;
					var index= array_nombres_nueva.indexOf(this.config.usr_name[i]); //el mayor esta en la posición X
					i_usr=i;
					i_usr_cambiado=index;
				}
				}
			}
	

	if (notification === 'SMARTBAND') { 
			datalog = payload.toString(); 
			self.sendSocketNotification('smartband_data', datalog);
			var cadena_actividad=payload.split(",");
			var objetivo=cadena_actividad[0].toString();
			var pasos=cadena_actividad[1].toString();
			var pasos_mostrar=parseInt(pasos);
			var pasos_mostrar2=pasos_mostrar.toString();
			var distancia=cadena_actividad[2].toString();
			var porcentaje=cadena_actividad[3].toString();
	 		pasos_array[i_usr]=pasos_mostrar2;
			array_pasos_orden[i_usr]=pasos_mostrar;
			distancia_array[i_usr]=distancia;
			porcentaje_array[i_usr]=porcentaje;
			array_prueba=array_pasos_orden.slice(0);
			array_reordenada=array_pasos_orden.slice(0);
			array_nombres_nueva=this.config.usr_name.slice(0);
			array_porcentaje_orden=porcentaje_array.slice(0);
			array_ordenada=array_prueba.sort(function(a, b){return b-a});
			

			for (var i = 0; i < array_ordenada.length; i++) { 


				index = array_reordenada.indexOf(parseInt(array_ordenada[i])); 
				i_cantidad_datos=this.config.numero_usuarios;

				if (array_ordenada[i]===0){
					i_cantidad_datos=i;
					
 					break;
				}
				swap(array_nombres_nueva, i, index);
				swap(array_reordenada, i, index);
				swap(array_porcentaje_orden, i, index);
			}

			for (var i = 0; i < i_cantidad_datos; i++) {
			presencia_datos[i]=1;
			} 
			this.updateDom(self.config.fadeSpeed);	

	}

  },


  getDom: function() {	


		var self = this;
    	var wrapper = document.createElement("table");
		wrapper.className = "regular medium";

		var symbolWrapper =  document.createElement("tr");
		symbolWrapper.className = "fa fa-stack";
		var symbol = document.createElement("i");
		symbol.className = "fa fa-trophy regular large gold";
		symbol.style.display = 'inline-block';
		symbolWrapper.appendChild(symbol);


		wrapper.appendChild(symbolWrapper);
	
		for (var i = 0; i < this.config.numero_usuarios; i++) {


		var userData = document.createElement("tr");
		var text = document.createElement("tr");
		var suffix = document.createElement("tr");
		var datos = document.createElement("tr");
		var progress = document.createElement("tr");
		var bar = document.createElement("tr");
		var espacio2=document.createElement("tr");
		var texto_pasos=document.createElement("tr");
		var progress = document.createElement("tr");
		var bar = document.createElement("tr");
		var espacio3=document.createElement("tr");
		var order= document.createElement("tr");
	
		order.className='medium regular gold'
		order.innerHTML=(i+1)+'º\u00a0 \u00a0';
		order.style.display = 'inline-block';
		text.appendChild(order);
		userData.className = 'bold medium bright';
		suffix.className = "dimmed regular";
		texto_pasos.className = "dimmed regular";	
		userData.innerHTML = array_nombres_nueva[i];
		suffix.innerHTML = ' Usuario \u00a0 \u00a0';
		suffix.style.display = 'inline-block';
		userData.style.display = 'inline-block';
		datos.style.display = 'inline-block';
		datos.className = 'normal medium bright';

		//text.appendChild(suffix);
		text.appendChild(userData);

		if (presencia_datos[i]===1)
			{
			espacio2.innerHTML = "\u00a0 \u00a0";
			espacio2.style.display = 'inline-block';
			text.appendChild(espacio2);
			datos.innerHTML = array_reordenada[i];
			text.appendChild(datos);
			texto_pasos.innerHTML = ' \u00a0 Pasos';
			texto_pasos.style.display = 'inline-block';
			text.appendChild(texto_pasos);
			espacio3.innerHTML = "\u00a0 \u00a0 \u00a0";
			espacio3.style.display = 'inline-block';
			text.appendChild(espacio3);
			progress.className = 'progbarbkg2';
			bar.className = 'progbar';
			bar.style.width = array_porcentaje_orden[i] + '%';
			progress.appendChild(bar);
			progress.style.display = 'inline-block';
			text.appendChild(progress);
			}
		else
			{
			datos.innerHTML = "\u00a0 No hay datos";
			text.appendChild(datos);
			}


		wrapper.appendChild(text);

		}

		

		var space=document.createElement("div");
		space.innerHTML = "\u00a0 \u00a0";
		wrapper.appendChild(space);

		var introduction=document.createElement("div");
		introduction.className = 'regular small bright';
		introduction.innerHTML = "Últimos datos registrados. Entre de nuevo su perfil para actualizarlos.";
		wrapper.appendChild(introduction);

		return wrapper;
 },
});


