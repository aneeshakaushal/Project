
function validateSubscriberForm() {

    var name = document.getElementById("name").value;
    if (name == null || name =="") {
    	 $("#myAlert").text("Please enter name!");
         $("#myAlert").addClass("in");
        return false;
    }
    if (name.length > 10) {
         $("#myAlert").text("Maximum length is 10 characters");
         $("#myAlert").addClass("in");
        return false;
    } 
    return true;   
}
function validateSubscriptionForm(){

    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    console.log(endDate);
    if($("#service_select").val() == null){
         $("#myAlert").text("Please select a service");
         $("#myAlert").addClass("in");
        return false;
    }
    if(startDate == ""){
    	 $("#myAlert").text("Please enter start date");
         $("#myAlert").addClass("in");
        return false;
    }
    if(endDate == ""){
         $("#myAlert").text("Please enter end date");
         $("#myAlert").addClass("in");
        return false;
    }
    if(Date.parse(endDate) < Date.parse(startDate)){
      $("#myAlert").text("End date should be greater than start date");
         $("#myAlert").addClass("in");
        return false;
    }
    return true;
}

function validateUserForm(){
    var name_user = $('#name_user').val();
    if (name_user == null || name_user =="") {
         $("#myAlert").text("Please enter user name!");
         $("#myAlert").addClass("in");
        return false;
    }
    if (name_user.length > 10) {
         $("#myAlert").text("Maximum length is 10 characters");
         $("#myAlert").addClass("in");
        return false;
    } 
    return true;   
}

function validateServiceForm() {

    var name = $('#name_service').val();
    if (name == null || name =="") {
       $("#myAlert").text("Please enter name!");
         $("#myAlert").addClass("in");
        return false;
    }
    return true;   
}

function toggleForm(){
    $('.glyphicon.glyphicon-plus').click(function(){

        $('#subscription_data').hide();
        var id= this.id.substr(0,this.id.length - 4);        
        
        if(id == "subscription"){
            $('#edit_subscription').attr('id',"save_subscription");
            $('#subscription_form').show();
            $('#service_select').val($("#service_select option:first").val()).change();
            $('#startDate').val("");
            $('#endDate').val("");
        }
        $("#"+id+"-panel").show();
        $(".save").attr('value', 'Save');
        if(id=="subscriber"){
            //console.log("subscriber");   
            $('#edit').attr('id',"save");     
            $('#name').val("");
       }
       else if(id=="service"){
        console.log("service");
        $('#edit_service').attr('id',"save_service");
        $('#name_service').val("");
        $('#product').val($("#product option:first").val()).change();
        $('#market').val($("#market option:first").val()).change();
       }
       else if(id=="user"){
            console.log("user");
            $('#edit_user').attr('id',"save_user");
            $('#name_user').val("");
            $('#subscriber_select').val($('#subscriber_select option:first').val()).change();
            $('#admin').prop('checked',false);
       }
       else{

       } 
    });
}

function subscriptionData () {
    // body...
     $('table').on('click', '.glyphicon.glyphicon-th-list', function(){ 
            console.log("this is view");
            $('#subscription_form').hide();
            $('#subscription_data').show();

            var $row = $(this).closest('tr');
            $('#serNam').text($('.serviceName',$row).text());
            $('#sd').text($('.startDate',$row).text());
            $('#ed').text($('.endDate',$row).text());

      });

}

function addingSubscriptions () {
    // body...
    $('table').on('click', 'tr .name', function(){
    $('#subscriber-panel').show();

    $('#subscriber_form').show();
    subscriber_index = $(this).parent()[0].sectionRowIndex;
    console.log(subscriber_index);
    
    $('#details').removeClass('active').removeClass('in');
    $('#subscri').addClass('active').addClass('in');
    $('#view_subscription').addClass('active');
    $('#view_details').removeClass('active');
    });

    $('#view_details').click(function(){
         $('#details').addClass('active').addClass('in');
         $('#subscri').removeClass('active').removeClass('in');
        $('#view_subscription').removeClass('active');
    });
}

function extendSubscription(){
    $('table').on('click', '.endDate', function(){
        
        var $row = $(this).closest('tr');
        console.log("CLICKED EXTENSION");
        $('#extension').css("display","block");
       
        $('#extension').off().on('click','#days',function(){
                 var days = $('#unit').val();
                 if(isNaN(days) == true){
                     $("#myAlert").text("Please enter a number");
                      $("#myAlert").addClass("in");
                        return false;
                 }
                 var oldDate = $('.endDate',$row).text();
                 var mom = new moment(oldDate,'MM-DD-YYYY');
                 console.log(mom.format('MM/DD/YYYY')+"Hadd ho gyi ab");
            if($('input[name=extend]:checked', '#extension_form').val() == "months"){
                    $('.endDate',$row).text(mom.add(days,'months').format('MM/DD/YYYY'));
                    
            }
            else{
                    $('.endDate',$row).text(mom.add(days,'days').format('MM/DD/YYYY'));
            }


        });
    });
}

$(function() { 
    /*Displaying data from susbscription table*/
    subscriptionData();

    /*Subscriber Subscription relationship*/
    addingSubscriptions();

    /*Filling form */
    $('table').on('click', '.glyphicon.glyphicon-edit', function(){               
        console.log("clicked");
       
        var id= $(this).attr("class").substr(0,$(this).attr("class").length - 25);
        var $row = $(this).closest('tr');
         $(".save").attr('value', 'Edit');

        if(id == "subscription"){
            $('#subscription_form').show();            
        }
     
        $("#"+id+"-panel").show();  
        

        if(id == "subscription"){
            $('#save_subscription').attr('id',"edit_subscription");
            console.log($('#edit_subscription').val());
            $('#service_select').val($('.serviceName',$row).text()).change();
            $('#startDate').val($('.startDate',$row).text());
            $('#endDate').val($('.endDate',$row).text());
        }
       else if(id=="subscriber"){
            //console.log("subscriber");   
            $('#save').attr('id',"edit");
            console.log($('#edit').val());     
            $('#name').val($('.name',$row).text());
       }
       else if(id=="user"){
            console.log("user");
            $('#save_user').attr('id',"edit_user");
            console.log($('#edit_user').val());
            $('#name_user').val($('.userName',$row).text());
            $('#subscriber_select').val($('.subscriberName',$row).text()).change();//
            if($('.admin',$row).text()=="true"){
                $('#admin').prop('checked',true);
            }
            else{
                $('#admin').prop('checked',false);
            }
       }
       else{
            console.log("service");
            $('#save_service').attr('id',"edit_service");
            console.log($('#edit_service').val());
        $('#name_service').val($('.service',$row).text());
        $('#product').val($('.product',$row).text()).change();
         $('#market').val($("#market option:first").val()).change();
       }
        
       
    });


   	$( ".datepicker" ).datepicker();
	$("#date").text(moment().format('MMMM Do YYYY, h:mm:ss a')); 
    $("#arrow-right").click(function(){
        $("#side_bar").toggle();
    });
    
    toggleForm();

    /*Extending subscription*/
    extendSubscription();
    
    $('#cssmenu ul li').click(function(){
        $('#cssmenu ul li').removeClass('active');
        $(this).addClass('active');

        $( "#cssmenu ul li" ).each(function( index ) {
          $($(this).children("a").attr('href')).css("display","none");
});
        $($(this).children("a").attr('href')).css("display","block");

    });


    $("input").focusout(function(){
    if ($(this).val().length != 0){
        $("#myAlert").removeClass("in");

    }    
});



    view = new ListView(model_list, {'list': $('#subscriber_table_body'), 'editButton' : '.glyphicon.glyphicon-edit', 'addButton' : '#save' ,'delButton': '.delete_subscriber','template':$('#template'),'count':$('#subscriber_count')}); //new listView(model,elements)
    var controller = new ListController(model_list, view);
    view.show();
    
    
   view_user = new ListView(model_list_user, {'list': $('#user_table_body'), 'editButton' : '.glyphicon.glyphicon-edit', 'addButton' : '#save_user' ,'delButton':'.delete_user','template':$('#template_user'),'count':$('#user_count')}); //new listView(model,elements)
    var controller_user = new ListController(model_list_user, view_user);
    view_user.show();

    
    view_service = new ListView(model_list_service, {'list': $('#service_table_body'), 'editButton' : '.glyphicon.glyphicon-edit','addButton' : '#save_service' ,'delButton': '.delete_service','template':$('#template_service'),'count': $('#service_count')}); //new listView(model,elements)
    var controller_service = new ListController(model_list_service, view_service);
    view_service.show();

   
   view_subscription = new ListView(model_list_subscription, {'list': $('#subscription_table_body'), 'editButton' : '.glyphicon.glyphicon-edit','addButton' : '#save_subscription' ,'delButton': '.delete_subscription','template':$('#template_subscription'),'count':$('#subscription_count')}); //new listView(model,elements)
    var controller_subscription = new ListController(model_list_subscription, view_subscription);
    view_subscription.show();
 }


);



