App.Service = DS.Model.extend({
	name : DS.attr('string'),
	product : DS.attr('string'),
   market : DS.attr('string')
});

App.Service.FIXTURES = [
 {
   id: 1,
   name : 'Service1',
   product : 'Calls',
   market : 'Chandigarh' 
 }
];