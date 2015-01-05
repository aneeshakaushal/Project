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
		this.store.find('user');
		controller.set('model',model)
	    
	  }

});

App.UsersRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('user');
	},

	setupController: function(controller, model) {
		this.store.find('subscriber');
		controller.set('model',model)
	    
	  }
});

App.SubscriptionRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('subscription');
	},
	setupController: function(controller, model) {
		this.store.find('service');
		controller.set('model',model)
	    
	 }
});

App.ServicesRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('service');
	}
});