App.Service = DS.Model.extend({
	name : DS.attr('string'),
	product : DS.attr('string'),
   market : DS.attr('string')
});

App.Service.reopenClass({
   FIXTURES : [
 {
   id: 1,
   name : 'DEFAULT_SERVICE',
   product : 'Calls',
   market : 'Chandigarh' 
 }
]
});