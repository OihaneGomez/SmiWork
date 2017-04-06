
/* 
SmiWork: Smart Mirror DeustoTech
Modulo: SMD-DefaultAdvices
MIT Licensed.
 */


var objetivo=10000;
var mostrar_pasos=0;
var salir=0;
var pasos=0;


Module.register("SMD-DefaultAdvices",{

	defaults: {
		   compliments: [
					"Según la OMS, España es considerada uno de los cuatro países más sedentarios de Europa, por detrás de Grecia, Bulgaria y Portugal",
					"Recuerda que la falta de ejercicio diario multiplica las posibilidades de sufrir enfermedades cardiovasculares",
					"Ten presente que estar físicamente activo ayuda a mejorar la productividad, al ralentizar el sedetarismo la función cerebral",
					"Caminar mejora la salud aeróbica y metabólica, intenta moverte todo lo que sea posible",
					"La falta de actividad física y la mala alimentación son la segunda causa de muerte en el mundo después del tabaquismo",
					"La inactividad física está directamente asociada con 3,2 millones de muertes prematuras cada año",
					"No realizar actividad física regular puede incrementar el riesgo de padecer depresión",
					"Estar quieto impide que la insulina funciones de manera adecuada e incrementa el riesgo de resistencia a la insulina",
					"Pasar un tiempo excesivo sentado aumenta el riesgo de sufrir problemas cardiacos, obstrucción arterias y otros problemas cardiacos. Trata de moverte.",
					"La baja actividad produce dolores articulares y contracturas debida a la pérdida de masa muscular y fuerza",
					"Mover los músculos ayuda al bombeo de sangre fresca y oxígeno a los órganos y al cerebro, fomentando su oxigenación y la liberación de productos químicos",
					"Caminar 2km al día reduce en un 28% la posibilidad de sufrir una parada cardiaca",
					"A nivel psicológico, los beneficios mentales de moverse incluyen la reducción de la ansiedad y de la depresión leve y la reactividad de estresores",
					"Recuerda que moverse reduce el estrés, da energía e incluso afecta al estado de ánimo",
					"Realiza ejercicios de estiramiento frecuentemente para combatir las consecuencias negativas de periodos prolongados en una misma postura",
					"¿Sabías que es recomendable evitar estar sentado por tiempo prolongado y estirar las piernas cada media hora?",
					"Pasar más de 8 horas sentado sin moverse incrementa el riesgo de contraer varias enfermedades crónicas",
					"La dedicación monotemática sin descanso a una actividad durante tiempos prolongados incrementa la posibilidad de desarrollar cuadros depresivos",
					"Aléjate del sedentarismo y evita cuando puedas todo lo que sea estar sentado sin hacer nada",
					"¿Sabías que, según la Organización Mundial de la Salud, más de la mitad de los adultos realizan una actividad física insuficiente?",
					"La inactividad física solo propicia una mayor inactividad y dificulta el cambio de hábitos",
					"No cambiar de postura de forma regular incrementa la mala circulación en las piernas creando problemas circulatorios y de retención de líquidos",
					"Una mala postura en la silla puede exagerar el arco natural de la columna y desgastar los discos de ésta, muévete con frecuencia para evitarlo",
					"La actividad física regular reduce los riesgos de padecer enfermedades coronarias, cáncer y osteoporosis",
					"El ejercicio moderado acelera temporalmente el sistema inmune, mejorando la capacidad del sistema inmunológico y recudiendo las infecciones",
					"Recuerda que el ejercicio no es solo bueno para tu cuerpo, sino también para tu mente",
					"Mantenerse activo de manera prolongada puede reducir hasta en un 50% el riesgo de muerte prematura",
					"¿Has probado a coger la costumbre de subir y bajar las escaleras andando? ¡Olvídate del ascensor!",
					"Entre los muchos beneficios del ejercicio físico se encuentra el de mantener e incrementar la densidad ósea",
					"Ten en cuenta que abandonar el sedentarismo no implica tener que realizar una actividad física intensa",
					"La actividad física ayuda a lograr una mejor coordinación y flexibilidad, mejorando la capacidad de estiramiento o elongación",
					"Recuerda que practicar ejercicio físico garantiza un buen descanso nocturno posterior",
					"Entre otras cosas, los ejercicios aeróbicos estimulan el crecimiento de nuevas células cerebrales en adultos",
					"Caminar es una excelente manera de lograr el objetivo de realizar al menos media hora de ejercicio diario",
					"El ejercicio físico también conlleva beneficios sociales como la mejora del rendimiento escolar y disminución del absentismo laboral",
					"El ejercicio regular alivia los dolores de espalda y mejoran tu postura",
					"Ser una persona activa tiene consecuencias positivas en la piel al incrementar la influencia de sangre, dando un aspecto más sano a esta",
					"Moverse mejora la capacidad pulmonar al aumentar la absorción de oxígeno en la sangre",
					"Caminar reduce el riesgo de sufrir diabetes de tipo 2",
					"La práctica regular de ejercicio reduce el riesgo a padecer cáncer de colon, al favorecer el tránsito intestinal",
					"¿Sabías que a través del ejercicio se consigue un mejor control sobre los movimientos del cuerpo?",
					"Volver andando a casa ayuda a liberar buena parte de la tensión acumulada en el día a día",
					"Ten en cuenta que tan solo 30 minutos de ejercicio diarios tienen un gran efecto en la salud",
					"El ejercicio moderado diario reduce significativamente el riesgo de parecer diabetes, tener un infarto o sufrir un ictus",
					"La actividad física regular reduce el riesgo de padecer depresión y ansiedad al segregar endorfinas e influir positivamente en el estado de ánimo",
					"Las consecuencias directas del ejercicio incluyen una mejora del sistema respiratorio y unos pulmones más sanos",
					"El ejercicio aumenta la autoestima, haciéndote sentir mejor y más relajado",
					"Cada día que realizas ejercicio consigues una mayor fuerza muscular y un mejor aprovechamiento del oxígeno, incrementado tu forma física",
					"Manteniéndote activo logras un corazón más sano y una mejor circulación sanguínea",
					"El esfuerzo del día a día se ve recompensado con una mejora tanto física como mental ¡Incluso influye en tu estado de ánimo!", 
					"Debido a los beneficios directos del ejercicio en el descanso, la actividad diaria ayuda a conciliar el sueño y a tener una mejor calidad de éste", 
					"Manteniéndote activo de manera prolongada se reduce hasta en un 50% el riesgo de muerte prematura",
					"Un estilo de vida saludable ayuda a proteger la salud", 
					"Siendo una persona activa se fomenta la energía y la vitalidad",
					"¡La práctica regular de ejercicio prolonga la vida!", 
		]
	},




	getScripts: function() {
		return ["moment.js"];
	},

	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		if (this.config.remoteFile != null) {
			this.complimentFile((response) => {
				this.config.compliments = JSON.parse(response);
			});
		}

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

	complimentArray: function() {
		var compliments  = null;
		compliments= this.config.compliments
		return compliments;
	},

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

	randomCompliment: function() {
		var compliments = this.complimentArray();
		var index = this.randomIndex(compliments);
		return compliments[index];
	},

	getDom: function() {
		var complimentText = this.randomCompliment();
		var wrapper = document.createElement("div");
		var quote = document.createElement("div");
		quote.className = "regular medium bright";
		quote.style.textAlign = 'center';
		quote.style.margin = '0 auto';
		quote.style.maxWidth = '90%';
		quote.innerHTML = complimentText;
		wrapper.appendChild(quote);



		return wrapper;
		
	},

	notificationReceived: function(notification, payload, sender) {
		if (notification == "CURRENTWEATHER_DATA") {
		}

		if (notification == "VECES") {
			veces=payload;
		}
		if (notification == "SMARTBAND") { 
			mostrar_pasos=1;
			datalog = payload.toString();
			var cadena_actividad=payload.split(",");
			pasos=cadena_actividad[1].toString();
			this.updateDom();
		}
		if (notification == "LOGOUT") { 
			mostrar_pasos=0;
			this.updateDom();
		}
		if (notification == "CONSEJO"){
			console.log("Dentro de consejo");
			this.updateDom();

		}
		
	},

});
