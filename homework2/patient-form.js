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
    var i;

    // Mapping technical names to the labels on your form
    var labelMap = {
        "firstname": "First Name",
        "middleinit": "M.I.",
        "lastname": "Last Name",
        "dob": "Date of Birth",
        "ssn": "SSN",
        "addr1": "Address Line 1",
        "addr2": "Address Line 2",
        "city": "City",
        "state": "State",
        "zip": "Zip Code",
        "email": "Email",
        "phone": "Phone Number",
        "symptoms": "Symptoms",
        "gender": "Gender",
        "vax": "COVID-19 Vaccinated",
        "insurance": "Insurance",
        "health": "Current Health Rating",
        "userid": "User ID",
        "password": "Password"
    };

    formoutput = "<table class='output' align='center'><tr><th colspan='2'><h2>Please Review Your Information</h2></th></tr>";

    for (i = 0; i < formcontents.length; i++) {
        var element = formcontents.elements[i];
        var datatype = element.type;
        var friendlyName = labelMap[element.name] || element.name;

        switch (datatype) {
            case "checkbox":
                if (element.checked) {
                    formoutput += "<tr><td align='right'><b>" + friendlyName + "</b></td><td class='outputdata'>Checked</td></tr>";
                }
                break;
            case "radio":
                if (element.checked) {
                    formoutput += "<tr><td align='right'><b>" + friendlyName + "</b></td><td class='outputdata'>" + element.value + "</td></tr>";
                }
                break;
            case "button": case "submit": case "reset":
                break;
            default:
                if (element.value !== "") {
                    formoutput += "<tr><td align='right'><b>" + friendlyName + "</b></td><td class='outputdata'>" + element.value + "</td></tr>";
                }
        }
    }

    if (formoutput.length > 0) {
        formoutput += "</table>";
        document.getElementById("outputformdata").innerHTML = formoutput;
    }
}

function checkfirstname()
    {
        x = document.getElementById("firstname").value;
              document.getElementById("name_text").innerHTML = "good so far";
    }
    /* End of document: patient-form.js */
