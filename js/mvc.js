var model_list;
var model_list_user;
var view;
var model_list_service,model_list_subscription;
var model1;
var view_user;

var subscriber_index = 0;

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
    },
     depopulateSubscriptionList : function(subscription){
        console.log("User removed is"+subscription.name);
        for( i=this.subscriptionList.length-1; i>=0; i--) {
            if( this.subscriptionList[i].name == subscription.name) this.subscriptionList.splice(i,1);
        }
            view.show();
    }
}

function SubscriptionModel(name,startDate,endDate,subscriber){
    Model.call(this,name);
    this.startDate = startDate;
    this.endDate = endDate;
    this.subscriber = subscriber;
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
    if(items== null)
    {
        this._items = [];
    }
  /*  this._selectedIndex = -1;*/
    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.itemEdited = new Event(this);
  /*  this.selectedIndexChanged = new Event(this);*/
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

    replaceItem: function(index,item){
       console.log(index);
        this._items[index] = item;
        this.itemEdited.notify();
    },

    removeItemAt : function (index) {
      
        this._items.splice(index, 1);       
        this.itemRemoved.notify();
       
    },

    /*getSelectedIndex : function () {
        return this._selectedIndex;
    },*/

    /*setSelectedIndex : function (index) {
        var previousIndex;

        previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.selectedIndexChanged.notify({ previous : previousIndex });
    }*/
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
    /*this.listModified = new Event(this);*/
    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);
    this.editButtonClicked = new Event(this);
    var _this = this;

    // attach model listeners
    this._model.itemAdded.attach(function () { _this.show(); });
    this._model.itemRemoved.attach(function () { _this.show(); });
    this._model.itemEdited.attach(function () { _this.show(); });

   
  /*  this._elements.addButton.click(function () {
        _this.addButtonClicked.notify();
    });*/

    $(document).on('click',this._elements.addButton,function(e){      
      

      _this.addButtonClicked.notify({index : subscriber_index});
       
    });

    $(this._elements.list).on('click',this._elements.delButton,function(){
      var myIndex = $(this).closest('td').parent()[0].sectionRowIndex;
     // alert(myIndex);
      _this.delButtonClicked.notify({index : myIndex});
    });

     $(this._elements.list).on('click',this._elements.editButton,function(){     
    var myIndex = $(this).closest('td').parent()[0].sectionRowIndex;
     //alert("Edit button clicked"+myIndex);
    _this.editButtonClicked.notify({index : myIndex});
    });

}

ListView.prototype = {
    show : function () {
        var template = Handlebars.compile(this._template.html());
        var temp=template(this._model);
        this._list.empty();
        this._list.append(temp);
        console.log(temp);
        if(this._count != $('#subscription_count'))
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


    this._view.addButtonClicked.attach(function (sender,args) {
        _this.addItem(args.index);
    });

    this._view.delButtonClicked.attach(function (sender,args) {
        _this.delItem(args.index);
    });

    this._view.editButtonClicked.attach(function (sender,args) {
        _this.editItem(args.index);
    });
}

ListController.prototype = {
    addItem : function (index) {    
       /* alert("Adding an item");*/
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
                var subscription = new SubscriptionModel(service,startDate,endDate,model_list._items[subscriber_index]);
                model_list._items[subscriber_index].subscriptionList.push(subscription);
                this._model.addItem(subscription);
                view.show();
            }

        }
    
    },

    delItem : function (index) {      
       
       /*remove user from subscriber list*/
       if(this._view._list.selector == '#user_table_body'){
        var subscriber = this._model.getItem(index).subscriber;
        subscriber.depopulateList(this._model.getItem(index));

       }     
        if(this._view._list.selector == '#subscriber_table_body'){
            if(index == 0)
                return;
            console.log("I have u as subscriber");
            for(i = 0; i<model_list_user._items.length;i++){
            if(model_list_user._items[i].subscriber == this._model._items[index]){
                model_list_user._items[i].subscriber = model1;
                view_user.show();
            }
        }
       }
        if(this._view._list.selector == '#subscription_table_body'){
        var subscriber = this._model.getItem(index).subscriber;
        subscriber.depopulateSubscriptionList(this._model.getItem(index));
       } 
       
       this._model.removeItemAt(index);
       console.log(index);
    },

    editItem : function (index) { 
        //alert("Editing an item");

        if(this._view._list.selector == '#subscriber_table_body'){
            if(index == 0)
                {
                    alert("Cant edit default");
                    return ;
                }
        $(document).off().on('click','#edit',function(){
                var bool=validateSubscriberForm();
                 console.log(bool);
                    var item = $('#name').val();
                    console.log("the value is"+item);
                    if (bool == true) {
                        model_list.replaceItem(index,new SubscriberModel(item,[],[]));

                    }
        
        });
       }

        else if(this._view._list.selector == '#user_table_body'){
            
             $(document).off().on('click','#edit_user',function(){
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
                        model_list_user._items[index].subscriber.depopulateList(model_list_user.getItem(index));
                        model_list_user.replaceItem(index,user);
                    }
                    subscriber.populateUsers(user);
                });
        }
        else if(this._view._list.selector == '#service_table_body'){
                
            $(document).off().on('click','#edit_service',function(){
                var bool=validateServiceForm();
                var serviceName = $('#name_service').val();
                var product = $('#product').val();           
                var market = $('#market').val();
                if (bool == true) {
                    model_list_service.replaceItem(index,new ServiceModel(serviceName,product,market));
                }
            });

        }
        else{
           $(document).off('click','#edit_subscription').on('click','#edit_subscription',function(){
                console.log("hello i am Subscription");
            var bool=validateSubscriptionForm();
            var service = $('#service_select').val();
            var startDate = $('#startDate').val();           
            var endDate = $('#endDate').val();
            if (bool == true) {
                model_list_subscription.replaceItem(index,new SubscriptionModel(service,startDate,endDate));
            }
            });
        }        
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


    model1 = new SubscriberModel('DEFAULT',[],[]);	
    var user1 = new UserModel('abc',model1,true);
    var user2 = new UserModel('xyz',model1,false);
    var user3 = new UserModel('pqr',model1,false);
    model_list = new ListModel([model1]);
    model_list_user = new ListModel();  
     

    var service1 = new ServiceModel('Base Tariff-Local Re.1 National Rs.1.50 International Rs.5.00.','SMS');
    model_list_service = new ListModel([service1]); 

    var subscription1 = new SubscriptionModel('Base Tariff-Local Re.1 National Rs.1.50 International Rs.5.00.','12/3/1999','10/1/2000',model1);
    model_list_subscription = new ListModel([subscription1]);   



    /*filling subscriber list in user forum*/
    fillSubscriberList();
    fillServiceList();
   


});