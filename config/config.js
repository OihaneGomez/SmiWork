/* 
 * MIT Licensed.
 */

var config = {
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

	language: 'es',
	timeFormat: 24,
	units: 'metric',

	modules: [

		    {
			module: 'MMM-SimpleLogo',
			position: 'top_center',
	 		classes: 'default everyone',
			config: {
			fileUrl: "modules/MMM-SimpleLogo/public/Deustotech.png",
			}
		    },

		{
			module: 'SMD-RFIDProfile',
			classes: 'default everyone',
			position: 'top_center',
			config: {
				buttonPIN: 22,
				usr: [], //Id card numbers
				usr_name: [],//Usr names
				usr_smartband: [], //MAC smartbands 
				numero_usuarios:4
			}
		},

		{
			module: 'SMD-Log',
	 		classes: 'default everyone',
			config:{
				usr: [],//Id card numbers
				usr_name: [],//Usr names (change them in var usr_name in /modules/SMD-log/node_helper.js file too)
				usr_smartband: [], //MAC smartbands 
				numero_usuarios:4
			}
		},

		{
			module: 'MMM-ProfileSwitcher',
			config: {
				defaultClass: "default",
				everyoneClass: "everyone",
				includeEveryoneToDefault: false,
				alwaysShowLeave: true,
				animationDuration: 1000,
				ignoreModules: ["voicecontrol", "updatenotification" , "SMD-VoiceInterface", "SMD-RFIDProfile"],
				title: true,
				enterMessages: {},
				leaveMessages: {},
				includeEveryoneMessages: false
			}
		},

		{
			module: 'alert',
	 		classes: 'default everyone',
		},

		{
			module: 'clock',
			position: 'top_left',
	 		classes: 'default everyone'
		},

		    {
			module: 'calendar_monthly',
			position: 'top_left',
	 		classes: 'default everyone',
			config: {
			}
		    },


			{
				module: 'newsfeed',
				position: 'bottom_bar',
				classes: 'default everyone',
				config: {
					feeds: [
						{
						title: "Noticias",
						url: "http://www.deia.com/rss/general.xml"
						}
					],
					showSourceTitle: true,
					showPublishDate: true,
					showDescription: true
				}
			},


			{
		    		module: 'voicecontrol',
					classes: 'default everyone',
		    		config: {
		        	models: [
				    {
				        keyword: "Espejo",   
				        description: "ESPEJO: Activar control por voz",
				        file: "Espejo.pmdl", 
				        message: "ESPEJO"   
				    },
				    {
				        keyword: "Despierta",   
				        description: "DESPIERTA: Reactivar",
				        file: "Despierta.pmdl", 
				        message: "DESPIERTA"   
				    },

				    {
				        keyword: "Duerme",   
				        description: "DUERME: Desactivar",
				        file: "Duerme.pmdl", 
				        message: "DUERME"   
				    },
				    {
				        keyword: "Consejo",   
				        description: "CONSEJO: Ver consejo",
				        file: "Consejo.pmdl", 
				        message: "CONSEJO"   
				    },
				    {
				        keyword: "Ranking",   
				        description: "RANKING: Ver ranking",
				        file: "Ranking.pmdl", 
				        message: "RANKING"   
				    },
				    {
				        keyword: "Volver",   
				        description: "VOLVER: Volver",
				        file: "Volver.pmdl", 
				        message: "VOLVER"   
				    },

				]
		    			}	
			},

			{
				module: 'SMD-VoiceInterface',
				position: 'middle_center',
				classes: 'default everyone',
				config: {
				personalmodules: 'SMD-DefaultAdvices email calendar MMM-Traffic TiempoActual PrevisionMet SMD-SmartBand',
				models: [
				    {
					nombre:"VOLVER",
				        description: "Volver al inicio"
				    },
				    {
					nombre: "CONSEJO",
				        description: "Ver consejo de salud"
				    },
				    {
					nombre:"RANKING",
				        description: "Ver ranking actividad usuarios"
				    },
				    {
					nombre:"DUERME",
				        description: "Desactivar el espejo"
				    },
				    {
					nombre: "DESPIERTA",
				        description: "Reactivar el espejo"
				    },


					]
				}
			},


			{
			module: 'currentweather',
			position: 'top_right',
			classes: 'default everyone',
			config: {
				location: 'Bilbao',
				locationID: '3128026',  //ID from http://www.openweathermap.org
				appid: '466119753acbb12f6d46a7ca31903e0d'
			}
			},
			{
			module: 'weatherforecast',
			position: 'top_right',
			header: 'Previsión meteorológica',
			classes: 'default',
			config: {
				location: 'Bilbao',
				locationID: '3128026',  //ID from http://www.openweathermap.org
				appid: '466119753acbb12f6d46a7ca31903e0d'
			}
			},





			  {
				 module: 'SMD-TempHum',
				  position: 'top_left',
				  classes: 'default everyone',
				  config: {
			      }
			  },

			  {
				 module: 'SMD-SmartBand',
				  position: 'top_right',
				  classes: 'everyone', //every user has its own class: 'everybody, usr1, usr2, ..."
				  config: {
					Objetivo:10000,
					Altura:170
			      }
			  },

			{
				 module: 'SMD-ActiveCompetition',
				  position: 'middle_center',
				  classes: 'default everyone',
				  config: {
							Numero_usuarios:4,//number of users
							usr_name:[] //usr names
			      }
			  },

		{
			module: 'compliments',
			position: 'lower_third',
			classes: 'default'
		},

			{
				 module: 'SMD-Advices',
				  position: 'middle_center',
				  classes: 'everyone'
			  },

			{
				 module: 'SMD-DefaultAdvices',
				  position: 'middle_center',
				  classes: 'default'
			  },



		
		]

	};


/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
