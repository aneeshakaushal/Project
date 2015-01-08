index_service = 2;
count_service = 1;
App.ServicesController = Ember.ObjectController.extend({
	needs : ['subscription','services'],
	actions : {
		createService : function(){
			var bool = validateServiceForm();
			if(bool==false){
				return;
			}
			var servicename = this.get('newService');		



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
      		count_service++; 
      		$('#service_count').text('('+ (count_service) +')'); 
      		index_service++;
		},

		deleteService : function(service){
			count_service--;
			var self = this;

			if(service.get('id') != 1){					
			
				var subscriptions = this.get('controllers.subscription').subs();
				var sub = self.get('controllers.services').findService(1);
				
				subscriptions.forEach(function(item, index) {	
					console.log("Service name" + item.get('service').get('name'));			
 					if(item.get('service') == service){
 						item.set('service',sub);
 					    console.log("subscriber name" + item.get('subscriber').get('name'))
 						item.save();
 					}
				});

				service.deleteRecord();
				//this.store.dematerializeRecord(service);
				service.save();
			$('#service_count').text('('+ (count_service) +')'); 

		}
	},

		editService : function(service){
			//filling the form 
			if(service.get('id')== 1){
				return;
			}
			$("#service-panel").show();
			$('#product').val(service.get('product'));
			$('#name_service').val(service.get('name'));

			$('#save_service').hide();
			$('#edit_service').show();
			
			var self = this;
			
            $(document).off('click', '#edit_service').on('click', '#edit_service', function(){ 
            	
           	var name_service = $('#name_service').val();
			var product_selected = $('#product').val();	

			//call the validations ???
			var bool = validateServiceForm();
			if(bool == false){
				return;
			}
			console.log("hii whats up?");
			service.set('name',name_service);
			service.set('product',product_selected);		

			 
      		// Save the new model
      		service.save();
             });
		}


	},

	findService : function(id_selected){
			var services =  this.store.all('service');
			console.log(services.objectAt(id_selected-1));			
			return services.objectAt(id_selected-1);
		},
	
});