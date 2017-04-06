/* 
SmiWork: Smart Mirror DeustoTech
Modulo: SMD-RFIDProfile
MIT Licensed.
 */
var emailhidden = true;
var usr_config1 = 220132102268;
var veces1 =0;
var veces2 =0;
var actual;
var comprobar;
var nombre_actual;
var veces_array = [];
var veces_actual=0;;
var log_veces_actual=0;

Module.register('SMD-RFIDProfile',{	
	defaults: {
		buttonPIN: 5,
		clickDelay: 500,	
		usr:[],
		usr_name:[],
		usr_smartband:[],
	},	


    getStyles: function() {
        return ["font-awesome.css", this.file('SMD-RFIDProfile.css')];
    },


	socketNotificationReceived: function(notification, data) {

	if (notification === "USER"){
		var ID_usr = data.toString();
		var ID_usr2=Number(ID_usr);

		for (var i = 0; i < this.config.numero_usuarios; i++) {
			if (ID_usr2==this.config.usr[i])
				{
				console.log('Iguales');
					if (veces1===0)
						{
						this.sendNotification('CURRENT_PROFILE', this.config.usr_name[i]);
						veces_array[i]=veces_array[i]+1;
						log_veces_actual=veces_array[i].toString();
						console.log('Veces ' + log_veces_actual);
						this.sendNotification('VECES', log_veces_actual);
						this.sendNotification('LOGIN', this.config.usr_name[i]);
						this.sendNotification('READ_BLE', this.config.usr_smartband[i]);
						veces1=1;
						actual=this.config.usr[i];
						nombre_actual=this.config.usr_name[i];
						
						}
					else
					{		
						this.sendNotification('CURRENT_PROFILE', 'default');
						this.sendNotification('LOGOUT', nombre_actual);
						this.sendNotification('DELETE_BLE', this.config.usr_smartband[i]);
						veces1=0;

						if (this.config.usr[i] !== actual && comprobar===0)
						{
							this.sendNotification('CURRENT_PROFILE', this.config.usr_name[i]);
							veces_array[i]=veces_array[i]+1;
							log_veces_actual=veces_array[i].toString();
							console.log('Veces ' + log_veces_actual);
							this.sendNotification('VECES', log_veces_actual);
							this.sendNotification('LOGIN', this.config.usr_name[i]);
							this.sendNotification('READ_BLE', this.config.usr_smartband[i]);
							actual=this.config.usr[i];
							nombre_actual=this.config.usr_name[i];
							veces1=1;
							

						}

					}
				}

					if (i===(this.config.numero_usuarios-1))
					{
					comprobar =0;
					}


		}
	}
	},



	notificationReceived: function (notification, payload, sender) {
		if (notification === "CHANGED_PROFILE") {
		    this.selected = payload.to;
			if (payload.to=="default"){
			this.selected= "Ninguno";
			}
		    this.updateDom(0);
		}
    	},

	start: function() {
		this.sendSocketNotification('BUTTON_CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
		for (var i = 0; i < this.config.numero_usuarios; i++) {
		veces_array[i]=0;
}
	},



	getDom: function() {
		var wrapper = document.createElement("div");
 		wrapper.className = "navigation-button bright";
		wrapper.innerHTML = "Usuario:  " + this.selected;	
		return wrapper;
	}


});
