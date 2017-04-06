'use strict';
/* 
Smart Mirror DeustoTech
Modulo: SMD-Log
 */

const NodeHelper = require('node_helper');
var sys = require('sys');
var ID_read;
var datalog;
var veces;
var start;
var end;
var duration;
var duracion_total=0;
var first=0;
var ready;
var user='default';
var fecha_inicio;
var fecha_fin;
var hora_inicio;
var hora_fin;
/////
var i_usr=4; //determina el usuario default
var usr_name = [];//Include user names
var i_sesiones=[0,0,0,0,0];
var array_0=[];
var array_1=[];
var array_2=[];
var array_3=[];
var array_4=[];
var numero_usuarios=5;
//////////
var nombre_array=[];
var veces_array=[];
var pasos_array=[];
var distancia_array=[];
var porcentaje_array=[];
var tiempo_total=[];
var fecha_login_array=[];
var fecha_logout_array=[];
var duracion_sesion_array=[];
var guardar=[];
var duracion_guardar_sesion;
var duracion_horas;
var duracion_minutos;
var duracion_segundos;
var duracion_horas_total=0;
var duracion_minutos_total=0;
var duracion_segundos_total=0;

var o =[] // empty Object
var s = {}


var sesiones = "Sesiones";
s[sesiones]=[];
var sesiones_array=[];

for (var i = 0; i < numero_usuarios; i++) {
o[i] = {
    nombre:"" ,
    veces_sesiones:0,
	duracion_total:0,
	pasos_totales:0,
	distancia_total:0,
	porcentaje_total:0,
	interaccion_veces:0,
	sesiones:sesiones_array[i]
	};
	o[i].nombre=usr_name[i];

}

/////////////////////

var dateFormat = require('dateformat');
var fs = require('fs');
var logger = fs.createWriteStream('/root/SmiWork/modules/SMD-Log/Log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

var logger_csv_THL = fs.createWriteStream('/root/SmiWork/modules/SMD-Log/Log_csv_THL.csv', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

var logger_json = fs.createWriteStream('/root/SmiWork/modules/SMD-Log/Log.json', {
flags: 'a'
});


module.exports = NodeHelper.create({
  start: function () {
    this.started = false;
	logger.write("\r\n");
	logger.write("\r\n");
	logger.write("---------------------------------------------------------------------------------------------------\r\n");
	logger.write("------------------- Comienzo Log Fecha: " + Date().toString()+ " ------------------- \r\n"); 
	logger.write("---------------------------------------------------------------------------------------------------\r\n");
	logger.write("\r\n");
	//logger_csv.write("Fecha,Temperatura,Humedad,Luz\r\n");
	logger_json.write("\r\n");
	logger_json.write("\r\n\r\n\r\n\r\n\r\n");
	logger_json.write(JSON.stringify(Date().toString())); 
	logger_json.write("\r\n");
	logger_json.write("\r\n");
	logger_json.write(JSON.stringify(o, null, "\t")); 
	logger_json.write("\r\n");
	logger_json.write("\r\n");
  },

   socketNotificationReceived: function(notification, payload) {
    
		if (notification === 'veces_user') {     
			veces = payload.toString();
			}
		else if (notification === 'espejo_interacion') {     
			o[i_usr].interaccion_veces=o[i_usr].interaccion_veces+1;
logger_json.write(JSON.stringify(o, null, "\t"));
			}

		else if (notification === 'login_user') {  
			datalog = payload.toString();
			logger.write(Date().toString()+ "    LOGIN    " +   datalog  + "  (Nº de veces: " + veces + ")\r\n"); 
			fecha_inicio=(dateFormat(now, "mm-dd-yyyy")).toString();
			hora_inicio=(dateFormat(now, "HH:MM:ss")).toString();
			start= (new Date()).getTime();
            user=datalog;
			for (var i = 0; i < numero_usuarios; i++) {
				if (user===usr_name[i]){
				i_usr=i;
				console.log("I_usr=" + i_usr);
				}
				}
			}

	  
		else if (notification === 'logout_user') {     
			datalog = payload.toString();
			hora_fin=(dateFormat(now, "HH:MM:ss")).toString();
			fecha_fin=(dateFormat(now, "mm-dd-yyyy")).toString();
	 		end= (new Date()).getTime();

			duration= end-start;
			var absoluteHours = Math.floor(duration / 3600000); // 1 Hour = 36000 Milliseconds
			var hours = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
			var absoluteMinutes = Math.floor((duration % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
			var minutes = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
			var absoluteSeconds = Math.floor(((duration % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
			var seconds = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
			logger.write(Date().toString()+ "    LOGOUT   " + datalog +"  (Duración sesión: " + hours.toString() +':'+ minutes.toString()+':'+seconds.toString() + ")\r\n");

			//JSON
			duracion_guardar_sesion=(hours.toString() +':'+ minutes.toString()+':'+seconds.toString()).toString();
			duracion_horas=parseInt(hours) ;
			duracion_minutos=parseInt(minutes) ;
			duracion_segundos=parseInt(seconds) ;
			duracion_segundos_total=duracion_segundos+duracion_segundos_total;
			duracion_minutos_total=duracion_minutos+duracion_minutos_total;
			duracion_horas_total=duracion_horas+duracion_horas_total;
			tiempo_total[i_usr]=(duracion_horas_total.toString() +':'+ duracion_minutos_total.toString()+':'+duracion_segundos_total.toString()).toString();
			nombre_array[i_usr]=user;
			veces_array[i_usr]=veces;
			o[i_usr].nombre=nombre_array[i_usr];
    		o[i_usr].veces_sesiones=veces_array[i_usr];
			o[i_usr].duracion_total=tiempo_total[i_usr];

			logger_json.write("\r\n");
			logger_json.write("\r\n");
			//console.log("Pasa por escribir");

			sesiones_array[i_usr]={
				sesiones_prueba:'',
				};
			
			guardar[i_sesiones]={
					numero_sesion:'',
					fecha_login: '',
					hora_login:'',
					fecha_logout:'',
					hora_logout:'',
					duracion_sesion:'',
					pasos_sesion:'',
					distancia_sesion:'',
					porcentaje_objetivo_sesion:'',
			};
			
			guardar[i_sesiones].numero_sesion=veces;
			guardar[i_sesiones].fecha_login=fecha_inicio;
			guardar[i_sesiones].hora_login=hora_inicio;
			guardar[i_sesiones].fecha_logout=fecha_fin;
			guardar[i_sesiones].hora_logout=hora_fin;
			//console.log(guardar[i_sesiones].fecha_login);
			guardar[i_sesiones].pasos_sesion=pasos_array[i_usr];
			guardar[i_sesiones].distancia_sesion=distancia_array[i_usr];
			guardar[i_sesiones].porcentaje_objetivo_sesion=porcentaje_array[i_usr];
			guardar[i_sesiones].duracion_sesion=duracion_guardar_sesion;
			//console.log("i_usr  "+i_usr);
			//console.log("longitud array  "+i_sesiones[i_usr]);
			//console.log("guardar"+JSON.stringify(guardar[i_sesiones], null, "\t"));
			
			sesiones_array[i_usr].sesiones_prueba=guardar[i_sesiones];

			//for (var i=0;i <= i_sesiones[i_usr]; i++) {
			//console.log("dentro de for  "+i);
			
			//seleccionar array 
			switch (i_usr){
			//Var Usr0
				case 0:
					array_0.push(sesiones_array[i_usr].sesiones_prueba);
					o[i_usr].sesiones=array_0;
				break;
			//Var Usr1
				case 1:
					array_1.push(sesiones_array[i_usr].sesiones_prueba);
					o[i_usr].sesiones=array_1;
				break;
			//Var Usr2
				case 2:
					array_2.push(sesiones_array[i_usr].sesiones_prueba);
					o[i_usr].sesiones=array_2;
				break;
			//Var Usr3
				case 3:
					array_3.push(sesiones_array[i_usr].sesiones_prueba);
					o[i_usr].sesiones=array_3;
				break;
				};
			//console.log("sesiones_array[i_usr]"+JSON.stringify(sesiones_array[i_usr], null, "\t"));
			//console.log("s[sesiones]"+JSON.stringify(s[sesiones], null, "\t"));
			logger_json.write(JSON.stringify(o, null, "\t"));
			i_sesiones[i_usr]=i_sesiones[i_usr]+1;
			//console.log(i_sesiones);
			i_usr=4;
			}


		else if (notification === 'enviroment') {
			var cadena=payload.split(",");
		  	var temperature = cadena[0];
		  	var humidity = cadena[1];
			var light = cadena[2];
			var now = new Date();
			logger.write(Date().toString()+ "    Temperatura= " + temperature.toString() + " ºC"  + "  - Humedad= " + humidity.toString() + " %" + "  - Nivel de luz= " + light.toString());
			logger_csv_THL.write(dateFormat(now, "mm-dd-yyyy")+","+dateFormat(now, "HH:MM:ss")+","+temperature.toString()+','+humidity.toString()+','+light.toString()+'\r\n')

			
		}

		else if (notification === 'smartband_data') {   //objetivo, pasos, km, porcentaje  
			var cadena_actividad=payload.split(",");
			var objetivo=cadena_actividad[0].toString();
			var pasos=cadena_actividad[1].toString();
			var pasos_mostrar=parseInt(pasos);
			var pasos_mostrar2=pasos_mostrar.toString();
			var distancia=cadena_actividad[2].toString();
			var porcentaje=cadena_actividad[3].toString();
	 		pasos_array[i_usr]=pasos_mostrar2;
			//console.log("pasos"+pasos_array[i_usr]);
			distancia_array[i_usr]=distancia;
			porcentaje_array[i_usr]=porcentaje;
			o[i_usr].pasos_totales=pasos_array[i_usr];
    		o[i_usr].distancia_total=distancia_array[i_usr];
			o[i_usr].porcentaje_total=porcentaje_array[i_usr];

			
			logger.write(Date().toString()+ "    ACTIVIDAD FÍSICA: " + user + "  Pasos: " + pasos_mostrar2 +'  - Distancia:  '  + distancia+ ' km'+'  ('+porcentaje.toString() + ' %' + "  del objetivo de  " + objetivo + " pasos)\r\n");
			}

    }
  
});
