App.User = DS.Model.extend({
	name : DS.attr('string'),
	subscriber : DS.belongsTo('subscriber'),
   admin : DS.attr('boolean')
});

App.User.FIXTURES = [
 {
   id: 1,
   name : 'User1',
   admin : true
   
 },
 {
   id: 2,
   name : 'User2',
   admin : false
 },
 {
   id: 3,
   name : 'User3',
   subscriber : 2,
   admin : true
 }
];