
var index_subscriber = 3;
var current_subscriber = 1;

App.SubscriberController = Ember.ObjectController.extend({
	needs : 'users',
	actions : {
		createSubscriber : function(){	
			var title = this.get('newSubscriber');
			
			//call the validations ???
			var bool = validateSubscriberForm();

			if(bool==false){
				return;
			}
				var subscriber = this.store.createRecord('subscriber',{
				name : title,
				id : index_subscriber,

			});


			 // Clear the "New Todo" text field
      		this.set('newSubscriber', '');

      		// Save the new model
      		subscriber.save();

      		index_subscriber++;
      	
		},

		deleteSubscriber : function(subscriber){
			if(subscriber.get('id') != 1){	

				var self = this;
				var users = subscriber.get('users');
				
				users.forEach(function(item, index) {
 						/*item.set('subscriber',*/
 							var sub = self.get('controllers.subscriber').findSubscriber(1);
 							item.set('subscriber',sub);
 							item.set('name',"Assssssss");
 							console.log(item.get('subscriber').get('name'));
 							item.save();
 					});

				subscriber.deleteRecord();
				subscriber.save();

		


	},

		editSubscriber : function(subscriber){
			//filling the form 
			$('subscriber-panel').show();
			$('#name').val(subscriber.get('name')).focus();
			$("#save").hide();
            $('#edit').show();

			//editing the form
			 $(document).off('click', '#edit').on('click', '#edit', function(){ 
  
				var title = $('#name').val();
			//call the validations ???
			var bool = validateSubscriberForm();
			if(bool == false){
				return;
			}

			subscriber.set('name',title);			 
      		// Save the new model
      		subscriber.save();
             });


		},

		sendId : function(subscriber){
			current_subscriber = subscriber.get('id')
		}
		
	},
		findSubscriber : function(id_selected){
			var sub =  this.store.all('subscriber');
			console.log(sub.objectAt(id_selected-1));
			console.log(sub.objectAt(id_selected-1).get('users'));
			return sub.objectAt(id_selected-1);
		},
		hello : function(){
			console.log("Hello")			
		},



	
	
});