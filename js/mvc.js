var model_list;
var model_list_user;
var view;

function Model(name){
    this.name = name;
}


function UserModel(name,subscriber,admin){
    Model.call(this,name);
    this.subscriber = subscriber;
    this.admin = admin;
}

UserModel.prototype = Object.create(Model.prototype);
UserModel.prototype.constructor = UserModel;

function SubscriberModel(name,userList,subscriptionList){
    Model.call(this,name);
    this.userList = userList;
    this.subscriptionList = subscriptionList;
}

SubscriberModel.prototype = Object.create(Model.prototype);
SubscriberModel.prototype.constructor = SubscriberModel;
SubscriberModel.prototype = {
    populateUsers : function(user){
        console.log("The user added is "+ user.name);
        this.userList.push(user);
        view.show();
    }
}
function SubscriptionModel(name,startDate,endDate){
    Model.call(this,name);
    this.startDate = startDate;
    this.endDate = endDate;
}

SubscriptionModel.prototype = Object.create(Model.prototype);
SubscriptionModel.prototype.constructor = SubscriptionModel;


function ServiceModel(name,product,market){
    Model.call(this,name);
    this.product = product;
    this.market = market;
}

ServiceModel.prototype = Object.create(Model.prototype);
ServiceModel.prototype.constructor = ServiceModel;



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
};
/*
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
    this._model.itemAdded.attach(function () { _this.show(); });
    this._model.itemRemoved.attach(function () { _this.show(); });

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
        var template = Handlebars.compile(this._template.html());
        var temp=template(this._model);
        this._list.empty();
        this._list.append(temp);
        this._count.text("("+this._model._items.length +" )");
        fillSubscriberList();
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
            var subscriber = $.grep(model_list._items,function(e){
                return e.name == $("#subscriber_select").val(); 
            })[0];
            console.log(subscriber.name);
            var bool=validateUserForm();
            console.log(bool+"hello i am user");
            var item = $('#name_user').val();
            var admin = $('#admin').prop('checked');
            console.log("the value is"+item);
            var user = new UserModel(item,subscriber,admin);

            if (bool == true) {
                this._model.addItem(user);
            }

            subscriber.populateUsers(user);

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

function fillSubscriberList(){
    var template = Handlebars.compile($('#subscriber_select_template').html());
        var temp=template(model_list);
        $('#subscriber_select').empty();
         $('#subscriber_select').append(temp);
}

$(function(){

	model1 = new SubscriberModel('abc',[1,3],[]);
	model2 = new SubscriberModel('subscriber2',[],[]);
	model_list = new ListModel([model1,model2]); 
	view = new ListView(model_list, {'list': $('#subscriber_table_body'), 'addButton' : $('#save') ,'delButton':$('#delete'),'template':$('#template'),'count':$('#subscriber_count')}); //new listView(model,elements)
	var controller = new ListController(model_list, view);
    view.show();



    var user1 = new UserModel('abc',model1,true);
    var user2 = new UserModel('xyz',model1,false);
    var user3 = new UserModel('pqr',model2,false);
    var model_list_user = new ListModel([user1,user2,user3]); 
    var view_user = new ListView(model_list_user, {'list': $('#user_table_body'), 'addButton' : $('#save_user') ,'delButton':$('#delete'),'template':$('#template_user'),'count':$('#user_count')}); //new listView(model,elements)
    var controller_user = new ListController(model_list_user, view_user);
    view_user.show();

    var user1 = new UserModel('abc',model1,true);
    var user2 = new UserModel('xyz',model1,false);
    var user3 = new UserModel('pqr',model2,false);
    var model_list_user = new ListModel([user1,user2,user3]); 
    var view_user = new ListView(model_list_user, {'list': $('#user_table_body'), 'addButton' : $('#save_user') ,'delButton':$('#delete'),'template':$('#template_user'),'count':$('#user_count')}); //new listView(model,elements)
    var controller_user = new ListController(model_list_user, view_user);
    view_user.show();

    var service1 = new ServiceModel('Base Tariff-Local Re.1 National Rs.1.50 International Rs.5.00.','SMS');
    var model_list_service = new ListModel([service1]); 
    var view_service = new ListView(model_list_service, {'list': $('#service_table_body'), 'addButton' : $('#save_service') ,'delButton':$('#delete'),'template':$('#template_service'),'count':$('#service_count')}); //new listView(model,elements)
    var controller_service = new ListController(model_list_service, view_service);
    view_service.show();

    /*filling subscriber list in user forum*/
    fillSubscriberList();
   

});