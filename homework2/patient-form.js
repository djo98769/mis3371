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
  if (!formcontents.checkValidity()) {
    formcontents.reportValidity();
    return; 
  }

  var uid = document.getElementById("userid").value.toLowerCase();
  var pass = document.getElementById("password").value.toLowerCase();
  if (uid !== "" && pass.includes(uid)) {
    alert("SECURITY ERROR: Your password cannot contain your User ID.");
    return;
  }

  var zipInput = document.getElementById("zip");
  if (zipInput.value.includes("-")) {
    zipInput.value = zipInput.value.split("-")[0];
  }

  var formoutput;
  var datatype;
  var i;
  
  formoutput = "<table class='output'><tr><th>Field Description</th><th>Value Entered</th><th>Status</th></tr>";

  for (i = 0; i < formcontents.length; i++) {
    datatype = formcontents.elements[i].type;
    var name = formcontents.elements[i].name;
    var value = formcontents.elements[i].value;

    switch (datatype) {
      case "checkbox":
        if (formcontents.elements[i].checked) {
          formoutput += "<tr><td>" + name + "</td><td class='outputdata'>Checked</td><td style='color:lime'>pass</td></tr>";
        }
        break;
      case "radio":
        if (formcontents.elements[i].checked) {
          formoutput += "<tr><td>" + name + "</td><td class='outputdata'>" + value + "</td><td style='color:lime'>pass</td></tr>";
        }
        break;
      case "button": case "submit": case "reset":
        break;
      default:
      
        formoutput += "<tr><td>" + name + "</td><td class='outputdata'>" + value + "</td><td style='color:lime'>pass</td></tr>";
    }
  }

  if (formoutput.length > 0) {
    formoutput += "</table>";
    document.getElementById("outputformdata").innerHTML = formoutput;
  }
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
