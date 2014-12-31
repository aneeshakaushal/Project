index_service = 2;
App.ServicesController = Ember.ObjectController.extend({
	actions : {
		createService : function(){
			
			var servicename = this.get('newService');
			if(!servicename.trim()){
				return;
			}

			var product_selected = $('#product').val();
			

			var service = this.store.createRecord('service',{
				name : servicename,
				id : index_service,
				product : product_selected
			});

			 // Clear the "New Todo" text field
      		this.set('newService', '');

      		// Save the new model
      		service.save();

      		index_service++;
		},

		deleteService : function(service){
			service.destroyRecord();
		}


	}
});