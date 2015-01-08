App.Subscription = DS.Model.extend({
	service : DS.belongsTo('service'),
	startDate : DS.attr('string'),
   endDate : DS.attr('string'),
   subscriber : DS.belongsTo('subscriber')
});

App.Subscription.reopenClass({
   FIXTURES : [
 {
   id: 1,
   service : 1,
   startDate : "12/2/2013",
   endDate : "12/4/2013",
   subscriber : 1,   
 },
 {
   id: 2,
   service : 1,
   startDate : "12/2/2014",
   endDate : "12/4/2014",
   subscriber : 2
 }
]
});