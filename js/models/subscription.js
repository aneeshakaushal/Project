App.Subscription = DS.Model.extend({
	service : DS.belongsTo('service'),
	startDate : DS.attr('date'),
   endDate : DS.attr('endDate'),
   subscriber : DS.belongsTo('subscriber')
});

App.Subscription.FIXTURES = [
 {
   id: 1,
   service : 1,
   subscriber : 1
   
 },
 {
   id: 2,
   service : 1,
   subscriber : 2
   
 }
];