
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
function validateForm2(){

    var startDate = document.getElementById("startDate").value;
    if(startDate=null || startDate == ""){
    	 $("#myAlert").text("Please enter start date");
         $("#myAlert").addClass("in");
        return false;
    }
}

$(function() {
	$( ".datepicker" ).datepicker();
	$("#name").keyup(function(){
    if ($(this).val().length != 0){
        $("#myAlert").removeClass("in");
    }
});
 }
);

