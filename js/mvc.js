function Model(name){
    this.name = name;
}
function SubscriberModel(name){
    Model.call(this,name);
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
        var list, items, key;

        list = this._elements.list; // list : #list 
        list.html($('<tr><th>Name</th><th>Number of Users</th><th>Number of Subscriptions</th><th>Action</th></tr>'));
        items = this._model.getItems();
        for (key in items) {
                if (items.hasOwnProperty(key))
                    list.append('<tr><td>'+items[key].name+'</td><td>0</td><td>0</td><td class="actions">&nbsp;<span class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;<span class="glyphicon glyphicon-trash"></span></td></tr>');
          
            console.log(items[key]);
        }
        this._model.setSelectedIndex(-1);
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
            this._model.addItem(new SubscriberModel(item));
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
	var model1 = new SubscriberModel('abc');
	var model2 = new SubscriberModel('xyz');
	var model_list = new ListModel([model1,model2]); 
	var view = new ListView(model_list, {'list': $('#table1'), 'addButton' : $('#save') ,'delButton':$('#delete')}); //new listView(model,elements)
	var controller = new ListController(model_list, view);
	view.show();
});