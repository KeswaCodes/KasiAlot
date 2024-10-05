alert("hi");
// DOM elements
let fullname = document.getElementById("fullname").value;
let email = document.getElementById("email").value;
let username = document.getElementById("username").value;
let contactnumber = document.getElementById("contactNumber").value;
let password = document.getElementById("password").value;
let confirmPassword = document.getElementById("confirmPassword");

confirmPassword.addEventListener("change", () => {
    while (confirmPassword.value != password) {
        console.log("Passwords do not match");
    }
})