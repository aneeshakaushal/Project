
function Model(name){
    this.name = name;
}

function SubscriberModel(name,userList,subscriptionList){
    Model.call(this,name);
    this.userList = userList;
    this.subscriptionList = subscriptionList;
}
SubscriberModel.prototype = {
    getUserCount : function(){
        return this.userList.length;
    },
    getSubscriptionCount : function(){
        return this.subscriptionList.length;
    }
}

SubscriberModel.prototype = Object.create(Model.prototype);
SubscriberModel.prototype.constructor = SubscriberModel;

function UserModel(name,subscriber,admin){
    Model.call(this,name);
    this.subscriber = subscriber;
    this.admin = admin;
}

function ListModel(items) {
    this._items = items;
    this._selectedIndex = -1;
    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.selectedIndexChanged = new Event(this);
}

ListModel.prototype = {
    getItems : function () {
        return [].concat(this._items);
    },

    addItem : function (item) {
        
        this._items.push(item);
        this.itemAdded.notify({ item : item });
    },

    removeItemAt : function (index) {
        var item;
        item = this._items[index];
        this._items.splice(index, 1);
        this.itemRemoved.notify({ item : item });
        if (index === this._selectedIndex) {
            this.setSelectedIndex(-1);
        }
    },

    getSelectedIndex : function () {
        return this._selectedIndex;
    },

    setSelectedIndex : function (index) {
        var previousIndex;

        previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.selectedIndexChanged.notify({ previous : previousIndex });
    }
};/*
function ListSubscriberModel(items){
    ListModel.call(this,items);
}

ListSubscriberModel.prototype = Object.create(ListModel.prototype);
ListSubscriberModel.constructor.prototype = ListSubscriberModel;*/

/*Event is a simple class for implementing the Observer pattern*/
function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (args) {
        var index;
        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};
/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function ListView(model, elements,template) {
    this._model = model;
    this._elements = elements;
    this._template = this._elements.template;
    this._count = this._elements.count;
    this._list = this._elements.list;
    this.listModified = new Event(this);
    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);
    var _this = this;

    // attach model listeners
    this._model.itemAdded.attach(function () { _this.addRow(); });
    this._model.itemRemoved.attach(function () { _this.addRow(); });

    // attach listeners to HTML controls
    this._elements.list.change(function (e) {
        _this.listModified.notify({ index : e.target.selectedIndex });
    });
    this._elements.addButton.click(function () {
        _this.addButtonClicked.notify();
    });
    this._elements.delButton.click(function () {
        _this.delButtonClicked.notify();
    });
}

ListView.prototype = {
    show : function () {
        this.addRow();
    },

    addRow : function () {    
    var template = Handlebars.compile(this._template.html());
    var temp=template(this._model);      
    this._list.append(temp);
     /*Count in side bar*/
     this._count.text("("+this._model._items.length +" )");
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });

    this._view.delButtonClicked.attach(function () {
        _this.delItem();
    });
}

ListController.prototype = {
    addItem : function () {
        if(this._model._items[0] instanceof SubscriberModel){
        var bool=validateSubscriberForm();
        console.log(bool);
        var item = $('#name').val();
        console.log("the value is"+item);
        if (bool == true) {
                this._model.addItem(new SubscriberModel(item,[],[]));
            }
        }
        else if(this._model._items[0] instanceof UserModel){
            var bool=validateUserForm();
            console.log(bool+"hello");
            var item = $('#name_user').val();
            var subscriber = $('#sub_select').val();
            var admin = $('#admin').prop('checked');
            console.log("the value is"+item);
            if (bool == true) {
                this._model.addItem(new UserModel(item,subscriber,admin));
            }
        }
    
    },

    delItem : function () {
        var index;

        index = this._model.getSelectedIndex();
        if (index !== -1) {
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }
};

$(function(){

	var model1 = new SubscriberModel('abc',[],[]);
	var model2 = new SubscriberModel('xyz',[],[]);
	var model_list = new ListModel([model1,model2]); 
	var view = new ListView(model_list, {'list': $('#subscriber_table'), 'addButton' : $('#save') ,'delButton':$('#delete'),'template':$('#template'),'count':$('subscriber_count')}); //new listView(model,elements)
	var controller = new ListController(model_list, view);
    view.show();
    //Template for Subscriber table
    var template = Handlebars.compile($('#template').html());
    var temp=template(model_list);      
    $('#subscriber_table').append(temp);
    // Count in side bar
    $("#subscriber_count").text("("+model_list._items.length +" )");

    var user1 = new UserModel('abc','SubscriberName',true);
    var user2 = new UserModel('xyz','SubscriberName2',false);
    var user3 = new UserModel('pqr','SubscriberName2',false);
    var model_list_user = new ListModel([user1,user2,user3]); 
    var view_user = new ListView(model_list_user, {'list': $('#user_table'), 'addButton' : $('#save_user') ,'delButton':$('#delete'),'template':$('#template_user'),'count':$('user_count')}); //new listView(model,elements)
    var controller_user = new ListController(model_list_user, view_user);
    view_user.show();    

    //*Template for user table
    var template_user = Handlebars.compile($('#template_user').html());
    var temp_user=template_user(model_list_user);      
    $('#user_table').append(temp_user);
    //*Count in side bar
    $("#user_count").text("("+model_list_user._items.length +" )");

});