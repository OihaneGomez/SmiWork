

/* 
SmiWork: Smart Mirror DeustoTech
Modulo: SMD-Advices
MIT Licensed.
 */

var objetivo=10000;
var mostrar_pasos=0;
var salir=0;
var pasos=0;


Module.register("SMD-Advices",{

	// Module config defaults.
	defaults: {
		   compliments: {
				percent10: [
					"Parece que hoy no te estás moviendo mucho - Según la OMS, España es considerada uno de los cuatro países más sedentarios de Europa, por detrás de Grecia, Bulgaria y Portugal",
					"Llevas poca actividad en el día de hoy - Recuerda que la falta de ejercicio diario multiplica las posibilidades de sufrir enfermedades cardiovasculares",
					"Estás en la primera etapa del objetivo - Ten presente que estar físicamente activo ayuda a mejorar la productividad, al ralentizar el sedentarismo la función cerebral",
					"Estás un poco lejos de tu objetivo - Caminar mejora la salud aeróbica y metabólica, intenta moverte todo lo que sea posible",
					"Hoy estás algo parado - La falta de actividad física y la mala alimentación son la segunda causa de muerte en el mundo después del tabaquismo",
					"Te encuentras en el primer 10% de tu objetivo de pasos - La inactividad física está directamente asociada con 3,2 millones de muertes prematuras cada año",
					"Tu registro está algo alejado de lo deseado - No realizar actividad física regular puede incrementar el riesgo de padecer depresión",
					"Tus pasos actuales están por debajo del 10% de lo recomendado - Estar quieto impide que la insulina funciones de manera adecuada e incrementa el riesgo de resistencia a la insulina",
					"Todavía no te has movido mucho - Pasar un tiempo excesivo sentado aumenta el riesgo de sufrir problemas cardíacos, y obstrucción arterias. Trata de moverte.",
					"Tus pasos en el día de hoy son inferiores a 1000  - La baja actividad produce dolores articulares y contracturas debida a la pérdida de masa muscular y fuerza",
				],
				percent30: [
					"¡Vas por buen camino! - Mover los músculos ayuda al bombeo de sangre fresca y oxígeno a los órganos y al cerebro, fomentando su oxigenación y la liberación de productos químicos",
					"Poco a poco vas avanzando en el objetivo - Caminar 2km al día reduce en un 28% la posibilidad de sufrir una parada cardiaca",
					"Estás progresando en tu objetivo - A nivel psicológico, los beneficios mentales de moverse incluyen la reducción de la ansiedad y de la depresión leve y la reactividad de estresores",
					"Tus registros van mejorando - Recuerda que moverse reduce el estrés, da energía e incluso afecta al estado de ánimo",
					"Tu siguiente escalón son los 3000 pasos - Realiza ejercicios de estiramiento frecuentemente para combatir las consecuencias negativas de períodos prolongados en una misma postura",
					"Te estás acercando a los 3000 pasos - ¿Sabías que es recomendable evitar estar sentado por tiempo prolongado y estirar las piernas cada media hora?",
					"Te encuentras en tu primer tercio de objetivo - Pasar más de 8 horas sentado sin moverse incrementa el riesgo de contraer varias enfermedades crónicas",
					"Estás a tiempo de acercarte a tu objetivo - La dedicación monotemática sin descanso a una actividad durante tiempos prolongados incrementa la posibilidad de desarrollar cuadros depresivos",
					"Aún estás a tiempo de mejorar tus números - Aléjate del sedentarismo y evita cuando puedas todo lo que sea estar sentado sin hacer nada",
					"Estás cerca de alcanzar el primer tercio de tu objetivo - ¿Sabías que, según la Organización Mundial de la Salud, más de la mitad de los adultos realizan una actividad física insuficiente?",
				],
				percent50: [
					"Estás acercándote a la mitad del objetivo - Sigue trabajando y no te rindas, la inactividad física sólo propicia una mayor inactividad y dificulta el cambio de hábitos",
					"Tu progreso es el adecuado - No cambiar de postura de forma regular incrementa la mala circulación en las piernas creando problemas circulatorios y de retención de líquidos",
					"La mitad del objetivo está próximo - Una mala postura en la silla puede exagerar el arco natural de la columna y desgastar los discos de ésta, muévete con frecuencia para evitarlo",
					"Estás por debajo de los 5000 pasos - La actividad física regular reduce los riesgos de padecer enfermedades coronarias, cáncer y osteoporosis",
					"Continúa por este camino - El ejercicio moderado acelera temporalmente el sistema inmune, mejorando la capacidad del sistema inmunológico y reduciendo las infecciones",
					"Has superado los 3000 pasos - Recuerda que el ejercicio no es sólo bueno para tu cuerpo, sino también para tu mente",
					"Puedes acercarte más a tu objetivo - Mantenerse activo de manera prolongada puede reducir hasta en un 50% el riesgo de muerte prematura",
					"Te falta poco para llegar a la mitad de la meta - ¿Has probado a coger la costumbre de subir y bajar las escaleras andando? ¡Olvídate del ascensor!",
					"Poco a poco te vas acercando -  Entre los muchos beneficios del ejercicio físico se encuentra el de mantener e incrementar la densidad ósea",
					"Pasito a pasito lo estás consiguiendo - Ten en cuenta que abandonar el sedentarismo no implica tener que realizar una actividad física intensa",
				],

				percent75: [
					"¡Has cumplido la mitad del objetivo! - La actividad física ayuda a lograr una mejor coordinación y flexibilidad, mejorando la capacidad de estiramiento o elongación",
					"Has llegado a la mitad del camino - Recuerda que practicar ejercicio físico garantiza un buen descanso nocturno posterior",
					"Has superado la mitad del progreso deseable - Entre otras cosas, los ejercicios aeróbicos estimulan el crecimiento de nuevas células cerebrales en adultos",
					"Estás por encima de los 5000 pasos - Caminar es una excelente manera de lograr el objetivo de realizar al menos media hora de ejercicio diario",
					"¡Ya estás a mitad de camino! - El ejercicio físico también conlleva beneficios sociales como la mejora del rendimiento escolar y disminución del absentismo laboral",
					"Has superado el punto de inflexión  - El ejercicio regular alivia los dolores de espalda y mejoran tu postura",
					"Solo te queda la mitad - Ser una persona activa tiene consecuencias positivas en la piel al incrementar la afluencia de sangre, dando un aspecto más sano a esta",
					"Llevas más de 5000 pasos - Moverse mejora la capacidad pulmonar al aumentar la absorción de oxígeno en la sangre",
					"Tu siguiente objetivo es el último - Caminar reduce el riesgo de sufrir diabetes de tipo 2",
					"Cada vez estás más cerca del último tercio - La práctica regular de ejercicio reduce el riesgo a padecer cáncer de cólon, al favorecer el tránsito intestinal",
				],
				percent75plus: [
					"¡Estás cada vez más cerca de tu objetivo! - ¿Sabías que a través del ejercicio se consigue un mejor control sobre los movimientos del cuerpo?",
					"Has llegado al último tercio del objetivo - ¿Que tal si intentas dar una vuelta volviendo a casa para acercarte aún más?",
					"¡Ya casi lo has logrado! - Volver andando a casa ayuda a liberar buena parte de la tensión acumulada en el día a día",
					"Un último esfuerzo! - ¿Crees que podrás llegar a lograrlo? La recompensa merece la pena!",
					"Estás muy cerca de lograrlo - ¿A cuantos pasos crees que podrás llega hoy? Cuanto más te acerques al objetivo más beneficios obtendrás en tu salud",
					"Sólo te queda terminar el último cuarto del objetivo - Ten en cuenta que tan solo 30 minutos de ejercicio diarios tienen un gran efecto en la salud",
					"Estas muy cerca de conseguirlo - El ejercicio moderado diario reduce significativamente el riesgo de padecer diabetes, tener un infarto o sufrir un ictus",
					"Ya no queda nada - La actividad física regular reduce el riesgo de padecer depresión y ansiedad al segregar endorfinas e influir positivamente en el estado de ánimo",
					"¡No te rindas! - Las consecuencias directas del ejercicio incluyen una mejora del sistema respiratorio y unos pulmones más sanos",
					"¡Casi lo tienes! - El ejercicio aumenta la autoestima, haciéndote sentir mejor y más relajado",
				],
				percent100: [
					"¡Has cumplido el objetivo! - Cada día que lo logras consigues una mayor fuerza muscular y un mejor aprovechamiento del oxígeno, incrementado tu forma física",
					"¡Has alcanzado los 10000 pasos! - Con este gesto has conseguido un corazón más sano y una mejor circulación sanguínea",
					"¡Enhorabuena! - Tu esfuerzo día a día se ve recompensado con una mejora tanto física como mental ¡Incluso influye en tu estado de ánimo!", 
					"¡Lo has logrado! - Sigue trabajando diariamente y continuarás notando las consecuencias y los beneficios en la salud",
					"¡Felicidades! - Manteniendo este registro día a día reduces en un 28% la posibilidad de sufrir una parada cardiaca",
					"¡Te lo mereces! - Debido a los beneficios directos del ejercicio en el descanso, cumplir el objetivo diario ayuda a conciliar el sueño y a tener una mejor calidad de éste", 
					"¡Objetivo cumplido! - Manteniéndote activo de manera prolongada estás reduciendo hasta en un 50% el riesgo de muerte prematura",
					"¡100% Conseguido! - Este estilo de vida saludable ayuda a proteger tu salud, ¿Lo repetirás mañana?", 
					"¡Lo has bordado! - Siendo una persona activa estás fomentando tu energía y tu vitalidad",
					"¡Lo has hecho genial! - Cada día que lo consigas te será más sencillo lograrlo el siguiente ¡Inténtalo también mañana!",
					"¡Sigue así! - ¡La práctica regular de ejercicio prolonga tu vida!", 
				],
				nopercent:  [
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso",
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso",
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso", 
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso",
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso",
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso", 
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso",
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso",
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso", 
					"Todavía no hay datos registrados - Espere o entre de nuevo en su perfil para ver su progreso",
				],

		},
		updateInterval: 10000,
		remoteFile: null,
		fadeSpeed: 4000
	},

	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		if (this.config.remoteFile != null) {
			this.complimentFile((response) => {
				this.config.compliments = JSON.parse(response);
			});
		}


		// Schedule update timer.
/*
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
*/
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function(compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function() {
		var hour = moment().hour();
		var compliments  = null;
		//pasos=11000;
		console.log("Pasos"+pasos);
		//if (mostrar_pasos===1){
			if(mostrar_pasos===0){
			compliments= this.config.compliments.nopercent;
			}
			else{
			console.log("Pasos dentro de selección"+pasos);
			if (pasos >= 0 && pasos < (objetivo*0.10)) {
				compliments = this.config.compliments.percent10;
			console.log("percent10");
			} else if (pasos >= (objetivo*0.10) && pasos < (objetivo*0.30)) {
			console.log("percent30");
				compliments = this.config.compliments.percent30;
			}  else if (pasos >= (objetivo*0.30) && pasos < (objetivo*0.50)) {
				console.log("percent50");
				compliments = this.config.compliments.percent50;
			} else if (pasos >= (objetivo*0.50) && pasos < (objetivo*0.75)) {
			console.log("percent75");
				compliments = this.config.compliments.percent75;
			}else if (pasos >= (objetivo*0.75) && pasos < (objetivo*1)) {
				compliments = this.config.compliments.percent75plus;
			console.log("percent75plus");
			}else if (pasos >= (objetivo*1)){
				compliments = this.config.compliments.percent100;
				console.log("percent100");
			}
		}
		return compliments;
	},

	/* complimentFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	complimentFile: function(callback) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open("GET", this.file(this.config.remoteFile), true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function() {
		var compliments = this.complimentArray();
		var index = this.randomIndex(compliments);
		return compliments[index].split(" - ");
	},

	// Override dom generator.
	getDom: function() {

		
		var complimentText = this.randomCompliment();
		var percent = complimentText[0];
		var advice = complimentText[1];
		var wrapper = document.createElement("div");
		//wrapper.className = "thin large bright";
		var quote = document.createElement("div");
		quote.className = "bright large regular";
		quote.style.textAlign = 'center';
		quote.style.margin = '0 auto';
		quote.style.maxWidth = '90%';
		quote.innerHTML = percent;
		wrapper.appendChild(quote);
		var space = document.createElement("div");
		space.innerHTML = "<br>";
		wrapper.appendChild(space);

		var author = document.createElement("div");
		author.className = "light medium bright";
		author.innerHTML =advice;

		wrapper.appendChild(author);





		//wrapper.innerHTML=complimentText;

		return wrapper;
		
	},


/*

getDom: function() {
		var quoteText = this.randomQuote();

		var qMsg = quoteText[0];
		var qAuthor = quoteText[1];

		var wrapper = document.createElement("div");

		var quote = document.createElement("div");
		quote.className = "bright medium light";
		quote.style.textAlign = 'center';
		quote.style.margin = '0 auto';
		quote.style.maxWidth = '50%';
		quote.innerHTML = qMsg;

		wrapper.appendChild(quote);

		var author = document.createElement("div");
		author.className = "light small dimmed";
		author.innerHTML = "~ " + qAuthor;

		wrapper.appendChild(author);

		return wrapper;
	}

});


*/











	// Override notification handler.
	notificationReceived: function(notification, payload, sender) {
		if (notification == "CURRENTWEATHER_DATA") {
/*
			this.setCurrentWeatherType(payload.data);
*/		}

		if (notification == "VECES") {
			veces=payload;
		}
		if (notification == "SMARTBAND") { //Generar notificacion de los pasos en SMD-Smartband
			mostrar_pasos=1;
			datalog = payload.toString();
			//console.log("SMARTBAND  "+datalog); 
			//self.sendSocketNotification('smartband_data', datalog);
			var cadena_actividad=payload.split(",");
			pasos=cadena_actividad[1].toString();
			this.updateDom();
		}
		if (notification == "LOGOUT") { //Generar notificacion de los pasos en SMD-Smartband
			mostrar_pasos=0;
			this.updateDom();
		}
		if (notification == "CONSEJO"){
			console.log("Dentro de consejo");
			this.updateDom();

		}
		

		//if (notification == "DATA")//temperatura, humedad, luz... Abrir la ventana, 
	},

});
