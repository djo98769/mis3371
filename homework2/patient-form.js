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

        // --- VALIDATION LOGIC ---
        var isValid = element.checkValidity();

        // FAIL-SAFE 1: If it has a pattern, re-test it manually (fixes the "always pass" bug)
        if (element.hasAttribute('pattern') && rawValue !== "") {
            var pattern = new RegExp("^" + element.pattern + "$");
            if (!pattern.test(rawValue)) {
                isValid = false;
            }
        }

        // FAIL-SAFE 2: Check required fields that are empty
        if (element.hasAttribute('required') && rawValue === "") {
            isValid = false;
        }

        // FAIL-SAFE 3: Password Match
        if (element.id === "confirm_password") {
            if (rawValue !== document.getElementById("password").value) {
                isValid = false;
                element.title = "Passwords do not match";
            }
        }

        var status = isValid ? 
            "<span style='color:lightgreen'>PASS</span>" : 
            "<span style='color:red'>ERROR: " + (element.title || "Invalid Entry") + "</span>";

        formoutput += "<tr><td align='right'><b>" + friendlyName + "</b></td><td class='outputdata'>" + displayVal + "</td><td align='center'>" + status + "</td></tr>";
    }

    document.getElementById("outputformdata").innerHTML = formoutput + "</table>";
}

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

function checklastname() {
    var x = document.getElementById("lastname").value;
    var nameText = document.getElementById("name_text");
    
    if (x.length >= 2) {
        nameText.innerHTML = "last name good so far";
        nameText.style.color = "lightgreen";
    } else {
        nameText.innerHTML = "Last name too short";
        nameText.style.color = "red";
    }
}

function checkuserid() {
    var x = document.getElementById("userid");
    x.value = x.value.toLowerCase(); // Requirement 225.4
    var msg = document.getElementById("name_text"); // Reusing your message span
    
    if (x.checkValidity()) {
        msg.innerHTML = "User ID valid";
        msg.style.color = "lightgreen";
    } else {
        msg.innerHTML = x.title;
        msg.style.color = "red";
    }
}

function checkpass() {
    var p = document.getElementById("password");
    var msg = document.getElementById("name_text");
    
    if (p.checkValidity()) {
        msg.innerHTML = "Password meets requirements";
        msg.style.color = "lightgreen";
    } else {
        msg.innerHTML = "Must have: 1 Upper, 1 Lower, 1 Number, 1 Special";
        msg.style.color = "red";
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
