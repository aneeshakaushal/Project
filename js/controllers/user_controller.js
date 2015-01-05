var index_user = 4;

App.UsersController = Ember.ObjectController.extend({
	needs : 'subscriber',
	actions : {
		createUser : function(){
			console.log("User created");
			var username = $('#name_user').val();			
		
			var subscriber_selected = this.get('controllers.subscriber').findSubscriber($('#subscriber_select').val());
			var admin_value = $('#admin').prop('checked');

			//call the validations ???
			var bool = validateUserForm();

			if(bool == false){
				return;
			}

			//creating the user
			var user = this.store.createRecord('user',{
				name : username,
				subscriber : subscriber_selected,
				id : index_user,
				admin : admin_value,
			});
			
						

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
			user.deleteRecord();
			this.store.dematerializeRecord(user);
			user.save();


	},

	editUser : function(user){
			//Filling the form with user values
			$("#user-panel").show();
			$('#name_user').val(user.get('name')).focus();
			$('#subscriber_select').val(user.get('subscriber').get('id')).change();	
			if(user.get('admin') == true){
				$('#admin').prop('checked',true);
			}else{
				$('#admin').prop('checked',false);
			}	

            $("#save_user").hide();
            $('#edit_user').show();
            var self = this;
            $(document).off('click', '#edit_user').on('click', '#edit_user', function(){ 
           
			var username = $('#name_user').val();
			var subscriber_selected = self.get('controllers.subscriber').findSubscriber($('#subscriber_select').val());
			var admin_value = $('#admin').prop('checked');


			//call the validations ???
			var bool = validateUserForm();
			if(bool == false){
				return;
			}

			user.set('name',username);
			user.set('subscriber',subscriber_selected);
			user.set('admin',admin_value);

			 
      		// Save the new model
      		user.save();
             });

           
		},

	ff : function(){
		//editing the values
			
       
	}
	
	},
	 
programmers: function(){
	 	return this.store.all('subscriber');
	 }.property(),

  
});