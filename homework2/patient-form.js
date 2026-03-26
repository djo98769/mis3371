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
function getdata1() {
    var formcontents = document.getElementById("patientForm");
    var formoutput;
    var i;
    
    var labelMap = {
        "firstname": "First Name",
        "middleinit": "M.I.",
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

    formoutput = "<table class='output' align='center'><tr><th>Field</th><th>Entry</th><th>Status</th></tr>";

    for (i = 0; i < formcontents.length; i++) {
        var element = formcontents.elements[i];
        if (element.type === "button" || element.type === "submit" || element.type === "reset") continue;

        var friendlyName = labelMap[element.name] || element.name;
        var rawValue = element.value.trim();
        var displayVal = (element.type === "password" || element.id === "ssn") ? "********" : (rawValue || "(Empty)");
        
        var isValid = element.checkValidity();

        // Custom validation for passwords matching
        if (element.id === "confirm_password") {
            if (rawValue !== document.getElementById("password").value) {
                isValid = false;
                element.title = "Passwords do not match";
            }
        }

        var status = isValid ? "<span style='color:lightgreen'>PASS</span>" : 
                     "<span style='color:red'>ERROR: " + (element.title || "Invalid Entry") + "</span>";

        formoutput += "<tr><td align='right'><b>" + friendlyName + "</b></td><td class='outputdata'>" + displayVal + "</td><td align='center'>" + status + "</td></tr>";
    }

    document.getElementById("outputformdata").innerHTML = formoutput + "</table>";
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
