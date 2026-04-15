/* 
 Name: Daniel Jo
 File: homework3.js
 Date Created: 2026-04-01
 Date Updated: 2026-04-17
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

                var customError = element.validationMessage; 
                var isValid = element.checkValidity();
                
                var statusMsg = "";
                if (isValid && customError === "") {
                    statusMsg = "<span style='color:lightgreen'>PASS</span>";
                } else {
                    var errorText = customError || element.title || "Invalid Input";
                    statusMsg = "<span style='color:red'>ERROR: " + errorText + "</span>";
                }
                
                formoutput += "<tr><td align='right'>" + friendlyName + "</td><td class='outputdata'>" + displayVal + "</td><td align='center'>" + statusMsg + "</td></tr>";
                break;
        }
    }

    formoutput += "</table>";
    document.getElementById("outputformdata").innerHTML = formoutput;
}

function checkName(inputElement) {
    const nameText = document.getElementById(inputElement.id + "_text");
    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (inputElement.value.length === 0) {
        nameText.innerHTML = "<span style='color:lightcoral'>ERROR: Required</span>";
        return false;
    } else if (!nameRegex.test(inputElement.value)) {
        nameText.innerHTML = "<span style='color:lightcoral'>ERROR: Letters, apostrophes, and dashes only</span>";
        return false;
    } else {
        nameText.innerHTML = "<span style='color:lightgreen'>pass</span>";
        return true;
    }
}

function checkUserID() {
    var uid = document.getElementById("userid");
    var msg = document.getElementById("userid_text");
    
    uid.value = uid.value.toLowerCase();
    const uidRegex = /^[a-z][a-z0-9_-]{4,19}$/;

    if (uid.value.length === 0) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: User ID is required</span>";
        return false;
    } else if (!uidRegex.test(uid.value)) {
        msg.innerHTML = "<span style='color:lightcoral'>ERROR: Must be 5-20 chars, start with a letter, no special chars</span>";
        return false;
    } else {
        msg.innerHTML = "<span style='color:lightgreen'>pass</span>";
        return true;
    }
}

function checkPassword() {
    const password = document.getElementById('password').value;
    const passwordText = document.getElementById('password_text');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (passwordRegex.test(password)) {
        passwordText.innerHTML = "<span style='color:lightgreen'>Pass</span>";
        return true;
    } else {
        passwordText.innerHTML = "<span style='color:lightcoral'>Must be 8+ chars with 1 Uppercase, 1 Lowercase, and 1 Digit</span>";
        return false;
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const confirmText = document.getElementById('confirm_password_text');

    if (password === confirmPassword && confirmPassword !== "") {
        confirmText.innerHTML = "<span style='color:lightgreen'>Passwords match</span>";
        return true;
    } else {
        confirmText.innerHTML = "<span style='color:lightcoral'>Passwords do not match</span>";
        return false;
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

function formatSSN() {
    const ssnInput = document.getElementById('ssn');
    const ssnText = document.getElementById('ssn_text');
    let val = ssnInput.value.replace(/\D/g, ''); 
    let formatted = "";

    if (val.length > 0) {
        formatted = val.substring(0, 3);
        if (val.length > 3) {
            formatted += "-" + val.substring(3, 5);
        }
        if (val.length > 5) {
            formatted += "-" + val.substring(5, 9);
        }
    }
    ssnInput.value = formatted;
    if (val.length < 9 && val.length > 0) {
        ssnText.innerText = "Must be 9 digits";
        ssnText.style.color = "red";
    } else {
        ssnText.innerText = "";
    }
}

function checkDOB() {
    const dobInput = document.getElementById('dob');
    const dobText = document.getElementById('dob_text');
    const dobValue = new Date(dobInput.value);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    dobText.innerText = "";

    if (dobInput.value === "") {
        dobText.innerHTML = "<span style='color:lightcoral'>ERROR: Date of birth is required</span>";
        return false;
    } else if (dobValue > today) {
        dobText.innerHTML = "<span style='color:lightcoral'>ERROR: Date cannot be in the future</span>";
        return false;
    } else if (dobValue < minDate) {
        dobText.innerHTML = "<span style='color:lightcoral'>ERROR: Date cannot be more than 120 years ago</span>";
        return false;
    } else {
        dobText.innerHTML = "<span style='color:lightgreen'>pass</span>";
        return true;
    }
}

function checkEmail() {
    const emailInput = document.getElementById('email');
    const emailText = document.getElementById('email_text');
    emailInput.value = emailInput.value.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput.value)) {
        emailText.innerHTML = "<span style='color:lightgreen'>pass</span>";
        return true;
    } else {
        emailText.innerHTML = "<span style='color:lightcoral'>ERROR: Must be name@domain.tld</span>";
        return false;
    }
}

function checkPhone() {
    const phoneInput = document.getElementById('phone');
    const phoneText = document.getElementById('phone_text');
    let val = phoneInput.value.replace(/\D/g, ''); 
    let formatted = "";

    if (val.length > 0) {
        formatted = val.substring(0, 3);
        if (val.length > 3) {
            formatted += "-" + val.substring(3, 6);
        }
        if (val.length > 6) {
            formatted += "-" + val.substring(6, 10);
        }
    }
    
    phoneInput.value = formatted;

    if (val.length === 10) {
        phoneText.innerHTML = "<span style='color:lightgreen'>pass</span>";
        return true;
    } else if (val.length > 0) {
        phoneText.innerHTML = "<span style='color:lightcoral'>ERROR: Must be 10 digits</span>";
        return false;
    } else {
        phoneText.innerText = "";
        return true;
    }
}

function masterValidate() {
    const isFnameValid = checkName(document.getElementById('firstname'));
    const isLnameValid = checkName(document.getElementById('lastname'));
    const isDobValid = checkDOB();
    const isSsnValid = (document.getElementById('ssn').value.replace(/\D/g, '').length === 9);
    const isEmailValid = checkEmail();
    const isPhoneValid = checkPhone();
    const isUidValid = checkUserID();
    const isPwValid = checkPassword();
    const isPwMatchValid = checkPasswordMatch();

    if (isFnameValid && isLnameValid && isDobValid && isSsnValid && 
        isEmailValid && isPhoneValid && isUidValid && isPwValid && isPwMatchValid) {
        
        document.getElementById('btnSubmit').style.display = "inline-block";
        document.getElementById('btnValidate').style.display = "none";
        
        alert("All fields are valid! You may now click 'Submit'.");
    } else {
        alert("There are still errors on the form. Please fix the highlighted fields and try again.");
    }
}
    /* End of document: homework3.js */
