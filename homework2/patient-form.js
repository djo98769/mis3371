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
        "middleinit": "M.I.",
        "lastname": "Last Name",
        "dob": "Date of Birth",
        "ssn": "SSN",
        "addr1": "Address 1",
        "addr2": "Address 2",
        "city": "City",
        "state": "State",
        "zip": "Zip Code",
        "email": "Email",
        "phone": "Phone Number",
        "symptoms": "Symptoms",
        "history": "Medical History",
        "gender": "Gender",
        "vax": "COVID-19 Vaccinated",
        "insurance": "Insurance",
        "health": "Current Health Rating",
        "userid": "User ID",
        "password": "Password"
    };

    formoutput = "<table class='output' align='center'><tr><th>Field</th><th>Entry</th><th>Status</th></tr>";

for (i = 0; i < formcontents.length; i++) {
        var element = formcontents.elements[i];
        if (element.type === "button" || element.type === "submit" || element.type === "reset") continue;

        var friendlyName = labelMap[element.name] || element.name;
        var rawValue = element.value.trim();
        var displayVal = rawValue;

        // 1. Process display values
        if (element.type === "password") {
            displayVal = "********";
        } else {
            displayVal = rawValue || "(Empty)";
        }

        // 2. Logic: User ID requirement (convert to lowercase)
        if (element.id === "userid") {
            element.value = element.value.toLowerCase();
            rawValue = element.value;
            displayVal = rawValue;
        }

        // 3. Validation Logic
        var isValid = element.checkValidity();

        // FAIL-SAFE: If field is required but empty
        if (element.hasAttribute('required') && rawValue === "") {
            isValid = false;
        }

        // PASSWORD MATCH CHECK
        if (element.id === "confirm_password") {
            var pass = document.getElementById("password").value;
            if (rawValue !== pass) isValid = false;
        }

        var status = isValid ? 
            "<span style='color:lightgreen'>PASS</span>" : 
            "<span style='color:red'>ERROR: " + (element.title || "Invalid Entry") + "</span>";

        formoutput += "<tr><td align='right'><b>" + friendlyName + "</b></td><td class='outputdata'>" + displayVal + "</td><td align='center'>" + status + "</td></tr>";
    }

    if (formoutput.length > 0) {
        formoutput += "</table>";
        document.getElementById("outputformdata").innerHTML = formoutput;
    }
}

// Professor's "On the Fly" style function
function checkfirstname() {
    var x = document.getElementById("firstname").value;
    var nameText = document.getElementById("name_text");
    if (x.length >= 2) {
        nameText.innerHTML = "good so far";
        nameText.style.color = "lightgreen";
    } else {
        nameText.innerHTML = "Too short";
        nameText.style.color = "red";
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
