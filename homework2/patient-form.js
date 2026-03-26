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
        "vax": "Vaccinated for COVID-19?",
        "insurance": "Insurance?",
        "health": "How is your current health?",
        "userid": "User ID",
        "password": "Password",
        "confirm_password": "Confirm Password"
    };

    formoutput = "<table class='output' align='center'><tr><th>Field</th><th>Entry</th><th>Status</th></tr>";

    for (i = 0; i < formcontents.length; i++) {
        var element = formcontents.elements[i];
        var datatype = element.type;
        var friendlyName = labelMap[element.name] || element.name;

        switch (datatype) {
            case "checkbox":
                if (element.checked) {
                    var val = element.value.charAt(0).toUpperCase() + element.value.slice(1);
                    formoutput += "<tr><td align='right'>" + friendlyName + "</td><td class='outputdata'>" + val + "</td><td align='center' style='color:lightgreen'>PASS</td></tr>";
                }
                break;
                
            case "radio":
                if (element.checked) {
                    var radioVal = element.value.charAt(0).toUpperCase() + element.value.slice(1);
                    formoutput += "<tr><td align='right'>" + friendlyName + "</td><td class='outputdata'>" + radioVal + "</td><td align='center' style='color:lightgreen'>PASS</td></tr>";
                }
                break;

            case "button": case "submit": case "reset":
                break;

            default:
                var rawValue = element.value.trim();

                if (element.id === "userid") {
                    element.value = element.value.toLowerCase();
                    rawValue = element.value; 
                }

                var displayVal = (datatype === "password" || element.id === "ssn" || element.id === "confirm_password") ? "********" : (rawValue || "(Empty)");
                
                var isValid = element.checkValidity();
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
    var fn = document.getElementById("firstname");
    var msg = document.getElementById("firstname_text");
    if (fn.value.length < 1) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: Required Field</span>";
    } else if (!fn.checkValidity()) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: " + fn.title + "</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

function checklastname() {
    var ln = document.getElementById("lastname");
    var msg = document.getElementById("lastname_text");
    if (ln.value.length < 1) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: Required Field</span>";
    } else if (!ln.checkValidity()) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: " + ln.title + "</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

function checkUserID() {
    var uid = document.getElementById("userid");
    var msg = document.getElementById("userid_text");
    if (uid.value.length < 5) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: Must be at least 5 characters</span>";
    } else if (!uid.checkValidity()) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: " + uid.title + "</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

function checkPassword() {
    var pw = document.getElementById("password");
    var msg = document.getElementById("password_text");
    if (ln.value.length < 1) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: Required Field</span>";
    else if (!pw.checkValidity()) {
        msg.innerHTML = "<span style='color:lightred'>ERROR: " + pw.title + "</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

window.onload = function () {
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
