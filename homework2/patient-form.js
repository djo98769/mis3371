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
        "firstname": "First Name",
        "lastname": "Last Name",
        "userid": "User ID",
        "password": "Password",
        "confirm_password": "Confirm Password",
        "dob": "Date of Birth",
        "ssn": "SSN",
        "addr1": "Address 1",
        "zip": "Zip Code",
        "email": "Email",
        "phone": "Phone Number"
    };

    // Start table with 3 columns: Field, Entry, Status
    formoutput = "<table class='output' align='center'><tr><th>Field</th><th>Entry</th><th>Status</th></tr>";

    for (i = 0; i < formcontents.length; i++) {
        var element = formcontents.elements[i];
        var datatype = element.type;
        var friendlyName = labelMap[element.name] || element.name;

        switch (datatype) {
            case "checkbox":
                if (element.checked) {
                    formoutput += "<tr><td align='right'>" + friendlyName + "</td><td class='outputdata'>Checked</td><td align='center' style='color:lightgreen'>PASS</td></tr>";
                }
                break;
            case "radio":
                if (element.checked) {
                    formoutput += "<tr><td align='right'>" + friendlyName + "</td><td class='outputdata'>" + element.value + "</td><td align='center' style='color:lightgreen'>PASS</td></tr>";
                }
                break;
            case "button": case "submit": case "reset":
                break;
            default:
                var rawValue = element.value.trim();
                var displayVal = (datatype === "password" || element.id === "ssn") ? "********" : (rawValue || "(Empty)");
                var isValid = element.checkValidity();

                // Force error if required password is empty
                if (datatype === "password" && rawValue === "") { isValid = false; }

                var statusMsg = isValid ? "<span style='color:lightgreen'>PASS</span>" : 
                                "<span style='color:red'>ERROR: " + (element.title || "Invalid") + "</span>";

                formoutput += "<tr><td align='right'>" + friendlyName + "</td><td class='outputdata'>" + displayVal + "</td><td align='center'>" + statusMsg + "</td></tr>";
                break;
        }
    }

    formoutput += "</table>";
    document.getElementById("outputformdata").innerHTML = formoutput;
}

function checkfirstname() {
    var x = document.getElementById("firstname").value;
    var msg = document.getElementById("name_text");
    if (x.length < 2) {
        msg.innerHTML = "<span style='color:red'>NAME TOO SHORT</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>good so far</span>";
    }
}

window.onload = function checkdate() {
    var dobInput = document.getElementById("dob");
    if (dobInput) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        var maxDate = yyyy + '-' + mm + '-' + dd;
        var minDate = (yyyy - 120) + '-' + mm + '-' + dd;

        dobInput.setAttribute("max", maxDate);
        dobInput.setAttribute("min", minDate);
    }
};
    /* End of document: patient-form.js */
