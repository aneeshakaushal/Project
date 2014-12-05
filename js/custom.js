
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

    var startDate = $("#startDate").value;
    var endDate = document.getElementById("endDate").value;
    console.log(endDate);
    if(startDate=null || startDate == ""){
    	 $("#myAlert").text("Please enter start date");
         $("#myAlert").addClass("in");
        return false;
    }
    if(endDate=null || endDate == ""){
         $("#myAlert").text("Please enter end date");
         $("#myAlert").addClass("in");
        return false;
    }
     if (moment(endDate) > moment(startDate)) {        
        $("#myAlert").text("End date should be greater than Start date");
         $("#myAlert").addClass("in");
        $('#endDate').val("");
    }
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

$(function() {
	$( ".datepicker" ).datepicker();
	$("#date").text(moment().format('MMMM Do YYYY, h:mm:ss a')); 
    $("#arrow-right").click(function(){
        $("#side_bar").toggle();
    });
    $('.glyphicon.glyphicon-plus').click(function(){
        var id= this.id.substr(0,this.id.length - 4);
        if(id == "subscription"){
            $('#subscription_form').toggle(); 
        }
            $("#"+id+"-panel").toggle();         
    });
    
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
 }
);

