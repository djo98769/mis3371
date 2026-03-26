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
    document.getElementById("firstname_text").innerHTML = "";
    document.getElementById("lastname_text").innerHTML = "";
    document.getElementById("userid_text").innerHTML = "";
    document.getElementById("password_text").innerHTML = "";
    document.getElementById("confirm_password_text").innerHTML = "";
    document.getElementById("confirm_password").setCustomValidity("");
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
                if (element.id === "zip") {
                    if (rawValue.includes("-")) {
                        rawValue = rawValue.split("-")[0];
                    } else if (rawValue.length > 5) {
                        rawValue = rawValue.substring(0, 5);
                    }
                }
          
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
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Required Field</span>";
    } else if (!fn.checkValidity()) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: " + fn.title + "</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

function checklastname() {
    var ln = document.getElementById("lastname");
    var msg = document.getElementById("lastname_text");
    if (ln.value.length < 1) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Required Field</span>";
    } else if (!ln.checkValidity()) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: " + ln.title + "</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

function checkUserID() {
    var uid = document.getElementById("userid");
    var msg = document.getElementById("userid_text");
    uid.value = uid.value.toLowerCase();
    if (uid.value.length < 5) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Too short (Min 5)</span>";
    } else if (!uid.checkValidity()) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: " + uid.title + "</span>";
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

function checkPassword() {
    var pwInput = document.getElementById("password");
    var pw = pwInput.value;
    var uid = document.getElementById("userid").value;
    var fn = document.getElementById("firstname").value;
    var ln = document.getElementById("lastname").value;
    var msg = document.getElementById("password_text");

    pwInput.setCustomValidity("");

    if (pw.length < 8) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Too short (Min 8)</span>";
    } 
    else if (!pwInput.checkValidity()) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: " + pwInput.title + "</span>";
    } 
    else if (uid && pw.toLowerCase().includes(uid.toLowerCase())) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Password cannot contain User ID</span>";
        pwInput.setCustomValidity("Password cannot contain User ID");
    } 
    else if ((fn && pw.toLowerCase().includes(fn.toLowerCase())) || 
             (ln && pw.toLowerCase().includes(ln.toLowerCase()))) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Password cannot contain your name</span>";
        pwInput.setCustomValidity("Password cannot contain your name");
    } 
    else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
    }
}

function checkPasswordMatch() {
    var pw = document.getElementById("password");
    var confirm_pw = document.getElementById("confirm_password");
    var msg = document.getElementById("confirm_password_text");
    if (confirm_pw.value === "") {
        msg.innerHTML = "";
        confirm_pw.setCustomValidity("Confirming password is required");
    } else if (pw.value !== confirm_pw.value) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Passwords do not match</span>";
        confirm_pw.setCustomValidity("Passwords do not match");
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
        confirm_pw.setCustomValidity("");
    }
}

function populateStates() {
    const states = [
        {code: "AL", name: "Alabama"}, {code: "AK", name: "Alaska"}, {code: "AZ", name: "Arizona"},
        {code: "AR", name: "Arkansas"}, {code: "CA", name: "California"}, {code: "CO", name: "Colorado"},
        {code: "CT", name: "Connecticut"}, {code: "DE", name: "Delaware"}, {code: "DC", name: "District Of Columbia"},
        {code: "FL", name: "Florida"}, {code: "GA", name: "Georgia"}, {code: "HI", name: "Hawaii"},
        {code: "ID", name: "Idaho"}, {code: "IL", name: "Illinois"}, {code: "IN", name: "Indiana"},
        {code: "IA", name: "Iowa"}, {code: "KS", name: "Kansas"}, {code: "KY", name: "Kentucky"},
        {code: "LA", name: "Louisiana"}, {code: "ME", name: "Maine"}, {code: "MD", name: "Maryland"},
        {code: "MA", name: "Massachusetts"}, {code: "MI", name: "Michigan"}, {code: "MN", name: "Minnesota"},
        {code: "MS", name: "Mississippi"}, {code: "MO", name: "Missouri"}, {code: "MT", name: "Montana"},
        {code: "NE", name: "Nebraska"}, {code: "NV", name: "Nevada"}, {code: "NH", name: "New Hampshire"},
        {code: "NJ", name: "New Jersey"}, {code: "NM", name: "New Mexico"}, {code: "NY", name: "New York"},
        {code: "NC", name: "North Carolina"}, {code: "ND", name: "North Dakota"}, {code: "OH", name: "Ohio"},
        {code: "OK", name: "Oklahoma"}, {code: "OR", name: "Oregon"}, {code: "PA", name: "Pennsylvania"},
        {code: "PR", name: "Puerto Rico"}, {code: "RI", name: "Rhode Island"}, {code: "SC", name: "South Carolina"},
        {code: "SD", name: "South Dakota"}, {code: "TN", name: "Tennessee"}, {code: "TX", name: "Texas"},
        {code: "UT", name: "Utah"}, {code: "VT", name: "Vermont"}, {code: "VA", name: "Virginia"},
        {code: "WA", name: "Washington"}, {code: "WV", name: "West Virginia"}, {code: "WI", name: "Wisconsin"},
        {code: "WY", name: "Wyoming"}
    ];

    const stateSelect = document.getElementsByName("state")[0];
    if (stateSelect) {
        states.forEach(state => {
            let option = document.createElement("option");
            option.value = state.code;
            option.textContent = state.name;
            stateSelect.appendChild(option);
        });
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
    populateStates();
};
    /* End of document: patient-form.js */
