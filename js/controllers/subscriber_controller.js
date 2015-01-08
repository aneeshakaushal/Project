
var index_subscriber = 3;
var count_subscriber = 2;
var current_subscriber = 1;

App.SubscriberController = Ember.ObjectController.extend({
	needs : ['users','subscriber'],
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
      		count_subscriber++; 
      		$('#subscriber_count').text('('+ (count_subscriber) +')'); 
      		
      		index_subscriber++;
      	
		},

		deleteSubscriber : function(subscriber){
			count_subscriber--;
			var sub = this.get('controllers.subscriber').findSubscriber(1);
			subscriber.get('users').then(function(users){
				users.forEach(function(item, index, enumerable){
				item.set("subscriber",sub);
				item.save();
				subscriber.save();
			});
			});
		
			subscriber.get('subscriptions').then(function(subscriptions){
				subscriptions.forEach(function(item, index, enumerable){
				item.set("subscriber",sub);
				item.save();
				subscriber.save();
			});
			});

			sub.save();			
			subscriber.deleteRecord();
			subscriber.save();
			$('#subscriber_count').text('('+ (count_subscriber) +')'); 
		},

		editSubscriber : function(subscriber){
			//filling the form 
			if(subscriber.get('id')== 1){
				return;
			}
			$('#subscriber-panel').show();
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
			current_subscriber = subscriber.get('id');
			console.log("current is " + current_subscriber);
		}
		
	},
		findSubscriber : function(id_selected){
			var sub =  this.store.all('subscriber');
			return sub.objectAt(id_selected-1);
		},
		
		hello : function(){
			console.log("Hello")			
		},

		



	
	
});