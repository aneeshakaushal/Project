App.Router.map(function() {	
  // put your routes here  
 
  this.route('subscriber',{path : '/subscriber'});
  this.route('users',{path : '/users'});
  this.route('services',{path:'/services'}); 
  this.route('subscription',{path : '/subscription'})

});



App.SubscriberRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('subscriber');
	}
});

App.UsersRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('user');
	}
});

App.SubscriptionRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('subscription');
	}
});

App.ServicesRoute = Ember.Route.extend({
	model : function(){
		return this.store.find('service');
	}
});