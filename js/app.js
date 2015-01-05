App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  ready : function(){
  		$("select").select2({			
	});
  }
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

