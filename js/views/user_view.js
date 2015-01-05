App.UserView = Ember.Select.extend({
	didInsertElement : function(){
		this.$().focus();
	}
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);