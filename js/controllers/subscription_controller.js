index_subscription = 3;
App.SubscriptionController = Ember.ObjectController.extend({
	needs : ['services','subscriber'],

	doSomething : function(){
	/*$( ".datepicker" ).datepicker();
	$("#date").text(moment().format('MMMM Do YYYY, h:mm:ss a'));*/

	alert("hi")
	}.on('ready'),
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

			index_subscription++;
      		
      		// Save the new model
      		subscription.save();
      		
		},

		deleteSubscription : function(subscription){		
			
			/*
			subscription.deleteRecord();
			subscription.save().then(function(){
				subscriber.save();
			});
*/			var subscriber = subscription.get('subscriber');
			subscriber.get('subscriptions').removeObject(subscription);
			subscriber.save();
			subscription.destroyRecord();
			subscription.save();
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
			 $("#subscription-panel").show();
            $('#subscription_form').hide();
            $('#subscription_data').show();
            $('#serNam').text();
            $('#sd').text(this.get('strt'));
            $('#ed').text(subscription.get('endDate'));
        });
		
		},

		extendSubscription : function(subscription){
			 $('table').on('click', '.endDate', function(){
        
        var $row = $(this).closest('tr');
        console.log("CLICKED EXTENSION");
        $('#extension').css("display","block");
       
        $('#extension').off().on('click','#days',function(){
                 var days = $('#unit').val();
                 if(isNaN(days) == true){
                     $("#myAlert").text("Please enter a number");
                      $("#myAlert").addClass("in");
                        return false;
                 }
                 var oldDate = $('.endDate',$row).text();
                 var mom = new moment(oldDate,'MM-DD-YYYY');
                 console.log(mom.format('MM/DD/YYYY')+"Hadd ho gyi ab");
            if($('input[name=extend]:checked', '#extension_form').val() == "months"){
                   
                        var $added_date = mom.add(days,'months').format('MM/DD/YYYY');
                        if($added_date == "-NaN/-NaN/-0NaN")
                            {
                                $("#myAlert").text("Please enter valid data");
                                $("#myAlert").addClass("in");
                                return false;
                            }
                    //$('.endDate',$row).text($added_date); 
                    subscription.set('endDate',$added_date);

            }
            else{
                    var $added_date = mom.add(days,'days').format('MM/DD/YYYY');
                        if($added_date == "-NaN/-NaN/-0NaN")
                            {
                                $("#myAlert").text("Please enter valid data");
                                $("#myAlert").addClass("in");
                                return false;
                            }
                   // $('.endDate',$row).text($added_date);
                   subscription.set('endDate',$added_date);
            }

            subscription.save();


        });
    });
		},


		addPicker : function(){
			$( ".datepicker" ).datepicker();
		},


	},
	services : function(){
		return this.store.all('service')
	}.property(),

	subs : function(){
		return this.store.all('subscription')
	},

	findSubscription : function(id_selected){
			var subscriptions =  this.store.all('subscription');
			console.log(subscriptions.objectAt(id_selected-1));			
			return subscriptions.objectAt(id_selected-1);
		},
});