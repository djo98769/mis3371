/* 
 Name: Daniel Jo
 File: patient-form.js
 Date Created: 2026-03-01
 Date Updated: 2026-03-27
 Purpose: Redisplay/validate data from a form
 Notes: IF we are going to use document.write, we have to either include some HTML from another file 
 and bring it in here in the srcipt, OR use document.writes to inject html code for proper formatting.

*/
/* 
This subroutine simply retrieves the data names and entered data from the form.
This code doesn't require that you know how many elements are in your form OR the names of the variables. 
*/
function removedata1() {
  document.getElementById("outputformdata").innerHTML = "(you started over)";
}
 
function getdata1() {
    var formcontents = document.getElementById("patientForm");
    var formoutput;
    var datatype;
    
    var userIdField = document.getElementById("userid"); 
    if(userIdField) { userIdField.value = userIdField.value.toLowerCase(); }

    formoutput = "<table class='output'><tr><th>Field Name</th><th>Type</th><th>Entered Value</th><th>Status</th></tr>";

    for (var i = 0; i < formcontents.length; i++) {
        var element = formcontents.elements[i];
        datatype = element.type;
        var name = element.name || element.id;

        if (datatype === "button" || datatype === "submit" || datatype === "reset") continue;

        formoutput += "<tr><td align='right'><strong>" + name + "</strong></td>";
        formoutput += "<td align='center'>" + datatype + "</td>";

        var val = "";
        if (datatype === "checkbox") {
            val = element.checked ? "Checked" : "Unchecked";
        } else if (datatype === "radio") {
            if (element.checked) { val = element.value; } 
            else { continue; }
        } else {
            val = element.value;
        }

        formoutput += "<td class='outputdata'>" + val + "</td>";

        if (element.checkValidity()) {
            formoutput += "<td style='color: green; font-weight: bold;'>PASS</td>";
        } else {
            formoutput += "<td style='color: red; font-weight: bold;'>ERROR: " + element.validationMessage + "</td>";
        }
        
        formoutput += "</tr>";
    }

    formoutput += "</table>";
    document.getElementById("outputformdata").innerHTML = formoutput;
}
/* Experimentation...
var data = document.getElementById("storage").value;
formoutput = formoutput+"<tr><td>Storage? "+
  data+"</td></tr>";
/* End of Experiment */
   if (formoutput.length>0) { 
      formoutput = formoutput + "</table>";
      document.getElementById("outputformdata").innerHTML = formoutput;
   }
}
/* function getrangedata() {
  var slider = document.getElementById("budget");
  document.getElementById("rangedisplay").value = slider;
}
*/

/* This version gets the data from the form explicitely by field name. 
function getdata2()
*/

/* These are the subroutines to check inidivudial fields  */
function checkfirstname()
    {
        x = document.getElementById("firstname").value;
        /*
        if( x.length<2 ) { 
              document.getElementById("name_text").innerHTML = "NAME TOO SHORT"; 
              document.getElementById("good_count>=[i]").innerHTML = "X"; 
        else { */
              document.getElementById("name_text").innerHTML = "good so far";
    }

/* DOB validation */
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

var maxDate = yyyy + '-' + mm + '-' + dd;
var minDate = (yyyy - 120) + '-' + mm + '-' + dd;

document.getElementById("dob").setAttribute("max", maxDate);
document.getElementById("dob").setAttribute("min", minDate);
    /* End of document: patient-form.js */
