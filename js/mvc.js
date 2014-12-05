var model_list;
var model_list_user;
var view;
var model_list_service;

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
    },
    depopulateList : function(user){
        console.log("User removed is"+user.name);
        for( i=this.userList.length-1; i>=0; i--) {
            if( this.userList[i].name == user.name) this.userList.splice(i,1);
            }
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
    getItem : function (index) {
        return this._items[index];
    },
    addItem : function (item) {
        
        this._items.push(item);
        this.itemAdded.notify({ item : item });
    },

    removeItemAt : function (index) {
        var item;
        item = this._items[index];
        this._items.splice(index, 1);
       
        this.itemRemoved.notify();
        /*if (index === this._selectedIndex) {
            this.setSelectedIndex(-1);
        }*/
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
            console.log("Hii");
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

    $(this._elements.list).on('click',this._elements.delButton,function(){
      var myIndex = $(this).closest('td').parent()[0].sectionRowIndex;
      /*alert(myIndex);*/
      _this.delButtonClicked.notify({index : myIndex});
    });

}

ListView.prototype = {
    show : function () {
        var template = Handlebars.compile(this._template.html());
        var temp=template(this._model);
        this._list.empty();
        this._list.append(temp);
        console.log(temp);
        this._count.text("("+this._model._items.length +" )");
        fillSubscriberList();
        fillServiceList();
    }   
};


 //* The Controller. Controller responds to user actions and
 //* invokes changes on the model.
 
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

    this._view.delButtonClicked.attach(function (sender,args) {
        _this.delItem(args.index);
    });
}

ListController.prototype = {
    addItem : function () {

       

        if(this._view._list.selector == '#subscriber_table_body'){
        var bool=validateSubscriberForm();
        console.log(bool);
        var item = $('#name').val();
        console.log("the value is"+item);
        if (bool == true) {
                this._model.addItem(new SubscriberModel(item,[],[]));

            }
        }
        else if(this._view._list.selector == '#user_table_body'){
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
        else if(this._view._list.selector == '#service_table_body'){
            console.log("hello i am Service");
            var bool=validateServiceForm();
            var serviceName = $('#name_service').val();
            var product = $('#product').val();           
            var market = $('#market').val();
            if (bool == true) {
                this._model.addItem(new ServiceModel(serviceName,product,market));
            }

        }
        else if(this._view._list.selector == '#subscription_table_body'){
            console.log("hello i am Subscription");
            var bool=validateSubscriptionForm();
            var service = $('#service_select').val();
            var startDate = $('#startDate').val();           
            var endDate = $('#endDate').val();
            if (bool == true) {
                this._model.addItem(new SubscriptionModel(service,startDate,endDate));
            }

        }
    
    },

    delItem : function (index) {
       
       
       /*remove user from subscriber list*/
       if(this._view._list.selector == '#user_table_body'){
        var subscriber = this._model.getItem(index).subscriber;
        subscriber.depopulateList(this._model.getItem(index));
       }
       
       
       this._model.removeItemAt(index);
       console.log(index);
    },

    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    }
};

function fillSubscriberList(){
        var template = Handlebars.compile($('#select_template').html());
        var temp=template(model_list);
        $('#subscriber_select').empty();
         $('#subscriber_select').append(temp);
}

function fillServiceList(){
    var template = Handlebars.compile($('#select_template').html());
        var temp=template(model_list_service);
        $('#service_select').empty();
         $('#service_select').append(temp);
}

$(function(){


	model1 = new SubscriberModel('abc',[],[]);
	model2 = new SubscriberModel('subscriber2',[],[]);
	model_list = new ListModel([model1,model2]); 
	view = new ListView(model_list, {'list': $('#subscriber_table_body'), 'addButton' : $('#save') ,'delButton': '.delete_subscriber','template':$('#template'),'count':$('#subscriber_count')}); //new listView(model,elements)
	var controller = new ListController(model_list, view);
    view.show();
    
    var user1 = new UserModel('abc',model1,true);
    var user2 = new UserModel('xyz',model1,false);
    var user3 = new UserModel('pqr',model2,false);
    var model_list_user = new ListModel([user1,user2,user3]); 
    var view_user = new ListView(model_list_user, {'list': $('#user_table_body'), 'addButton' : $('#save_user') ,'delButton':'.delete_user','template':$('#template_user'),'count':$('#user_count')}); //new listView(model,elements)
    var controller_user = new ListController(model_list_user, view_user);
    view_user.show();

    var service1 = new ServiceModel('Base Tariff-Local Re.1 National Rs.1.50 International Rs.5.00.','SMS');
    model_list_service = new ListModel([service1]); 
    var view_service = new ListView(model_list_service, {'list': $('#service_table_body'), 'addButton' : $('#save_service') ,'delButton': '.delete_service','template':$('#template_service'),'count':$('#service_count')}); //new listView(model,elements)
    var controller_service = new ListController(model_list_service, view_service);
    view_service.show();

    var subscription1 = new SubscriptionModel('Base Tariff-Local Re.1 National Rs.1.50 International Rs.5.00.','12/3/1999','10/1/2000');
    var model_list_subscription = new ListModel([subscription1]); 
    var view_subscription = new ListView(model_list_subscription, {'list': $('#subscription_table_body'), 'addButton' : $('#save_subscription') ,'delButton': '.delete_subscription','template':$('#template_subscription'),'count':$('#service_count')}); //new listView(model,elements)
    var controller_subscription = new ListController(model_list_subscription, view_subscription);
    view_subscription.show();

    /*filling subscriber list in user forum*/
    fillSubscriberList();
    fillServiceList();
   


});