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
  var i;
  formoutput = "<table class='output'><tr><th>Field Name</th><th>Your Entry</th></tr>";
for (i = 0; i < formcontents.length; i++) {
    datatype = formcontents.elements[i].type;
    switch (datatype) {
        case "checkbox":
            if (formcontents.elements[i].checked) {
                formoutput += "<tr><td align='right'>" + formcontents.elements[i].name + "</td>";
                formoutput += "<td class='outputdata'>Checked</td></tr>";
            }
            break;
        case "radio":
            if (formcontents.elements[i].checked) {
                formoutput += "<tr><td align='right'>" + formcontents.elements[i].name + "</td>";
                formoutput += "<td class='outputdata'>" + formcontents.elements[i].value + "</td></tr>";
            }
            break;
        case "button": case "submit": case "reset":
            break;
        default:
            formoutput += "<tr><td align='right'>" + formcontents.elements[i].name + "</td>";
            formoutput += "<td class='outputdata'>" + formcontents.elements[i].value + "</td></tr>";
    }
}
   if (formoutput.length>0) { 
      formoutput = formoutput + "</table>";
      document.getElementById("outputformdata").innerHTML = formoutput;
   }
}

function checkfirstname()
    {
        x = document.getElementById("firstname").value;
              document.getElementById("name_text").innerHTML = "good so far";
    }
    /* End of document: patient-form.js */
