
function validateSubscriberForm() { 

    var name = document.getElementById("name").value;
    if (name == null || name.trim() =="") {
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
    if (name_user == null || name_user.trim() =="") {
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
    if (name == null || name.trim() =="") {
       $("#myAlert").text("Please enter service name!");
         $("#myAlert").addClass("in");
        return false;
    }
    return true;   
}

function toggleForm(){
  
    $(document).on('click', '.glyphicon.glyphicon-plus', function(){ 

        $('#subscription_data').hide(); 

        var id= this.id.substr(0,this.id.length - 4);        
          $("#"+id+"-panel").show();
        


        if(id == "subscription"){
             $("#save_subscription").show();
             $('#edit_subscription').hide();
             $('#service_select').val($("#service_select option:first").val()).change();
            $('#startDate').val("");
            $('#endDate').val("");
        }     
       

        if(id=="subscriber"){
            //console.log("subscriber");   
            $("#save").show();
            $('#edit').hide();
            $('#name').val("");
       }
       else if(id=="service"){
        console.log("service");
        $("#save_service").show();
        $('#edit_service').hide();
        $('#name_service').val("");
        $('#product').val($("#product option:first").val()).change();
        $('#market').val($("#market option:first").val()).change();
       }
       else if(id=="user"){
            console.log("user hii");
            $("#save_user").show();
            $('#edit_user').hide();
            $('#name_user').val("");
            $('#subscriber_select').val($('#subscriber_select option:first').val()).change();
            $('#admin').prop('checked',false);
       }
       else{

       }  
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
   
}

function fillingForm(){

   $('table').on('click', '.glyphicon.glyphicon-edit', function(){   


       console.log("clicked");
       
        var id= $(this).attr("class").substr(0,$(this).attr("class").length - 25);
        var $row = $(this).closest('tr');
        //$(".save").attr('value', 'Edit');

      if(id == "subscription"){
            $('#subscription_form').show();            
        }
        else{
           $("#"+id+"-panel").show();  
         } 
       
        

        if(id == "subscription"){
            $("#save_subscription").val('Edit');
            $('#save_subscription').attr('id',"edit_subscription");
            console.log($('#edit_subscription').val());
            $('#service_select').val($('.serviceName',$row).text()).change();
            $('#startDate').val($('.startDate',$row).text());
            $('#endDate').val($('.endDate',$row).text());
        }
       else if(id=="subscriber"){
            //console.log("subscriber"); 
            $("#save").val('Edit');  
            $('#save').attr('id',"edit");
            console.log($('#edit').val());     
            $('#name').val($('.name',$row).text());
       }
       else if(id=="user"){
            console.log("user");
            $("#save_user").val('Edit');
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
            $("#save_service").val('Edit');
            $('#save_service').attr('id',"edit_service");
            console.log($('#edit_service').val());
        $('#name_service').val($('.service',$row).text());
        $('#product').val($('.product',$row).text()).change();
         $('#market').val($("#market option:first").val()).change();
       }


       
    });
}

function extendSubscription(){
        
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
                   
                        var $added_date = mom.add(days,'months').format('MM/DD/YYYY');
                        if($added_date == "-NaN/-NaN/-0NaN")
                            {
                                $("#myAlert").text("Please enter valid data");
                                $("#myAlert").addClass("in");
                                return false;
                            }
                    $('.endDate',$row).text($added_date); 

            }
            else{
                    var $added_date = mom.add(days,'days').format('MM/DD/YYYY');
                        if($added_date == "-NaN/-NaN/-0NaN")
                            {
                                $("#myAlert").text("Please enter valid data");
                                $("#myAlert").addClass("in");
                                return false;
                            }
                    $('.endDate',$row).text($added_date);
            }


        });

}

$(function() { 

     $(document).on('click', '#arrow-right', function(){ 
            $("#side_bar").toggle();
    });


 

    /*Subscriber Subscription relationship*/
    addingSubscriptions();



    /*Filling form */
   fillingForm();


   	$( ".datepicker" ).datepicker();
	$("#date").text(moment().format('MMMM Do YYYY, h:mm:ss a')); 
   
    
    toggleForm();

    /*Extending subscription*/
    extendSubscription();
    
    $('#cssmenu ul li').click(function(){
        $('#cssmenu ul li').removeClass('active');
        $(this).addClass('active');

       /* $( "#cssmenu ul li" ).each(function( index ) {
          $($(this).children("a").attr('href')).css("display","none");
});
        $($(this).children("a").attr('href')).css("display","block");
*/
    });

    $(document).on('focusout', 'input', function(){    
    if ($(this).val().length != 0){
        $("#myAlert").removeClass("in");

    }    
});



 }


);



