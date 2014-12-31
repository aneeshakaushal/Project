var index_user = 4;

App.UsersController = Ember.ObjectController.extend({
	needs : 'subscriber',
	actions : {
		createUser : function(){
			var username = $('#user_name').val();
			if(!username.trim()){
				return;
			}
			
			var subscriber_selected = this.get('controllers.subscriber').findSubscriber($('#subscriber_select').val());
			var admin_value = $('#admin').prop('checked');

			//call the validations ???

			//creating the user
			var user = this.store.createRecord('user',{
				name : username,
				subscriber : subscriber_selected,
				id : index_user,
				admin : admin_value,
			});
			//Adding the user to selected subscriber list
						

			 // Clear the "New Todo" text field
      		this.set('newUser', '');

      		// Save the new model
      		user.save();

      		index_user++;
		},

		hello: function(){
			console.log("Hii");
		},

		programmer: function(){
	 	return this.store.all('subscriber');
	 }.property(),

	 deleteUser : function(user){
			user.destroyRecord();
		},

	editUser : function(user){
			$('#user_name').val(user.get('name')).focus();
			$('#subscriber_select').val(user.get('subscriber').get('id')).change();	
			if(user.get('admin') == true){
				$('#admin').prop('checked',true);
			}else{
				$('#admin').prop('checked',false);
			}
            
		}

	},

	 
programmers: function(){
	 	return this.store.all('subscriber');
	 }.property(),

  
});