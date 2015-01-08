App.Router.map(function() {	
  // put your routes here  
 
  this.route('subscriber',{path : '/subscriber'});
  this.route('users',{path : '/users'});
  this.route('services',{path:'/services'});
  this.route('subscription',{path : '/subscription'});

 });



App.SubscriberRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('subscriber');
	},

	setupController: function(controller, model) {		
		this.store.find('subscriber');
		this.store.find('user');
		this.store.find('subscription');
		controller.set('model',model)	    
	  },

  activate: function(){
  		$('#subscriber_count').text('('+ (index_subscriber-1) +')');
    	$('#user_count').text('('+ (index_user-1) +')');
    	$('#service_count').text('('+ (index_service-1) +')');
  		$('#cssmenu ul li').removeClass("active");
	 	$('#cssmenu  ul li:nth-child(1)').addClass("active");	
  	}

});

App.UsersRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('user');
	},

	setupController: function(controller, model) {		
		this.store.find('user');
		this.store.find('subscriber');
		controller.set('model',model);

	  },

	  activate: function(){
	  	$('#subscriber_count').text('('+ (index_subscriber-1) +')');
    	$('#user_count').text('('+ (index_user-1) +')');
    	$('#service_count').text('('+ (index_service-1) +')');
  		$('#cssmenu ul li').removeClass("active");
	 	$('#cssmenu  ul li:nth-child(2)').addClass("active")
		
  	}
});

App.SubscriptionRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('subscription');
	},
	setupController: function(controller, model) {
		
		this.store.find('service');		
		//this.store.find('user');
		controller.set('model',model)
	    
	 }
	
});

App.ServicesRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('service');
	},

	activate: function(){
		$('#subscriber_count').text('('+ (index_subscriber-1) +')');
    	$('#user_count').text('('+ (index_user-1) +')');
    	$('#service_count').text('('+ (index_service-1) +')');
		$('#cssmenu ul li').removeClass("active");
	 	$('#cssmenu  ul li:nth-child(3)').addClass("active")
  	}
});