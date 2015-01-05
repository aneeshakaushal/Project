index_subscription = 2;
App.SubscriptionController = Ember.ObjectController.extend({
	needs : ['services','subscriber'],
	actions : {
		createSubscription : function(){
			var bool = validateSubscriptionForm();	
			if(bool == false){
				return;
			}
			
			var subscriber_set = this.get('controllers.subscriber').findSubscriber(current_subscriber);
			var service_selected = this.get('controllers.services').findService($('#service_select').val());	
			var start = $('#startDate').val();
			var end = $('#endDate').val();

					

			var subscription = this.store.createRecord('subscription',{
				service : service_selected,
				id : index_subscription,
				startDate : start,
				endDate : end,
				subscriber : subscriber_set

			});
      		// Save the new model
      		subscription.save();
      		index_subscription++;
		},

		deleteSubscription : function(subscription){			
			subscription.destroyRecord();
		},

		editSubscription : function(subscription){
			//filling the form 
			$("#subscription-panel").show();
			$('#subscription_form').show();
			$('#subscription_data').hide();
			$('#startDate').val(subscription.get('startDate'));
			$('#endDate').val(subscription.get('endDate'));

			$('#save_subscription').hide();
			$('#edit_subscription').show();
			var self = this;
			
            $(document).off('click', '#edit_subscription').on('click', '#edit_subscription', function(){ 
           	var start = $('#startDate').val();
			var end = $('#endDate').val();
			var service_selected = self.get('controllers.services').findService($('#service_select').val());	


			//call the validations ???
			var bool = validateSubscriptionForm();
			if(bool == false){
				return;
			}

			subscription.set('startDate',start);
			subscription.set('endDate',end);
			subscription.set('service',service_selected);

			 
      		// Save the new model
      		subscription.save();
             });

			

		},

	
		//Displaying data of a subscription
		viewSubscription : function(subscription){			
			$(document).on('click', '.glyphicon.glyphicon-th-list', function(){ 
            $('#subscription_form').hide();
            $('#subscription_data').show();
            $('#serNam').text(subscription.get('service').get('name'));
            $('#sd').text(subscription.get('startDate'));
            $('#ed').text(subscription.get('endDate'));
        });
		
		},

		extendSubscription : function(){
			extendSubscription();
		}
	},
	services : function(){
		return this.store.all('service')
	}.property()
});