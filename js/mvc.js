
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
};
function ListSubscriberModel(items){
    ListModel.call(this,items);
}

ListSubscriberModel.prototype = Object.create(ListModel.prototype);
ListSubscriberModel.constructor.prototype = ListSubscriberModel;

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
function ListView(model, elements) {
    this._model = model;
    this._elements = elements;

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
    var template = Handlebars.compile($('#template').html());
    var temp=template(this._model);
    $('#subscriber_table').append(temp);
    $("#subscriber_count").text("("+this._model._items.length +" )");
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
        var bool=validateSubscriberForm();
        console.log(bool);
        var item = $('#name').val();
        console.log("the value is"+item);
        if (bool == true) {
            this._model.addItem(new SubscriberModel(item,[],[]));
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
	var model_list = new ListSubscriberModel([model1,model2]); 
	var view = new ListView(model_list, {'list': $('#table1'), 'addButton' : $('#save') ,'delButton':$('#delete')}); //new listView(model,elements)
	var controller = new ListController(model_list, view);

    view.show();
    //wants a path to where your template is stored
    // we say Handlebar take this template and compile it.. a function is returned
    var template = Handlebars.compile($('#template').html());
    var temp=template(model_list);
    $('#subscriber_table').append(temp);

    var arr = [1,2,2,2];
    /*Count in side bar*/
    $("#subscriber_count").text("("+model_list._items.length +" )");

});