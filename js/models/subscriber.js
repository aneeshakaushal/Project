App.Subscriber = DS.Model.extend({
	name : DS.attr('string'),
	users : DS.hasMany('user'),
	subscriptions : DS.hasMany('subscription')
});

App.Subscriber.FIXTURES = [{
   id: 1,
   name : 'Aneesha',
   users : [1,2],
   subscriptions : [1]
   
 },
 {
   id: 2,
   name : 'Jyoti',
   users : [3],
   subscriptions : [2]
 }]

 