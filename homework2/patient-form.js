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

    var labelMap = {
        "firstname": "First Name", "middleinit": "M.I.", "lastname": "Last Name",
        "dob": "Date of Birth", "ssn": "SSN", "addr1": "Address Line 1",
        "city": "City", "state": "State", "zip": "Zip Code", "email": "Email",
        "phone": "Phone Number", "symptoms": "Symptoms", "gender": "Gender",
        "vax": "COVID-19 Vaccinated", "insurance": "Insurance", 
        "health": "Current Health Rating", "userid": "User ID"
    };

    // Added a 'Status' header to meet rubric requirements
    formoutput = "<table class='output' align='center'><tr><th>Field</th><th>Entry</th><th>Status</th></tr>";

    for (i = 0; i < formcontents.length; i++) {
        var element = formcontents.elements[i];
        var datatype = element.type;
        if (datatype === "button" || datatype === "submit" || datatype === "reset") continue;

        var friendlyName = labelMap[element.name] || element.name;
        var val = element.value;
        var status = element.checkValidity() ? "<span style='color:lightgreen'>PASS</span>" : "<span style='color:red'>ERROR</span>";

        // Logic for specific types
        if (datatype === "checkbox") {
            val = element.checked ? "Checked" : "Not Checked";
        } else if (datatype === "radio") {
            if (!element.checked) continue; // Skip the radio options that aren't picked
        } else if (datatype === "password") {
            val = "********"; // Keep SSN/Password obscured
        }

        formoutput += "<tr><td><b>" + friendlyName + "</b></td><td class='outputdata'>" + val + "</td><td>" + status + "</td></tr>";
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
