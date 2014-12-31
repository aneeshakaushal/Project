
var index_subscriber = 3;


App.SubscriberController = Ember.ObjectController.extend({

	actions : {
		createSubscriber : function(){	
			var title = this.get('newSubscriber');
			if(!title.trim()){
				return;
			}
			
			//call the validations ???

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

		deleteSubscriber : function(id_deleted){
			this.model.findBy('name',id_deleted).destroyRecord();

		},

		editSubscriber : function(subscriber){
			$('#name').val(subscriber.get('name')).focus();			
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