var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var signupContainer = [];

if (localStorage.getItem("users") != null) {
  signupContainer = JSON.parse(localStorage.getItem("users"));
}

// to say welcome
var username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}
function isEmailExist() {
  for (var i = 0; i < signupContainer.length; i++) {
    if (
      signupContainer[i].email.toLowerCase() == signupEmail.value.toLowerCase()
    ) {
      return true;
    }
  }
}
function validitionName() {
  var regex = /^\w{3,}(\s+\w+)*$/;
  var text = signupName.value;
 

 if (regex.test(text)) {
  signupName.classList.remove("is-invalid");
    return true;
  } else {
    signupName.classList.add("is-invalid");
    return false;
  }
}
function validitionEmail() {
  var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
  var text = signupEmail.value;
 

 if (regex.test(text)) {
  signupEmail.classList.remove("is-invalid");
    return true;
  } else {
    signupEmail.classList.add("is-invalid");
    return false;
  }
}
function validitionPass() {
  var regex = /^.{8,}$/;
  var text = signupPassword.value;
 

 if (regex.test(text)) {
  signupPassword.classList.remove("is-invalid");
    return true;
  } else {
    signupPassword.classList.add("is-invalid");
    return false;
  }
}

function signup() {
  var info = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (isEmpty() == true) {
    document.getElementById("alert").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
  } else if (isEmailExist() == true) {
    document.getElementById("alert").innerHTML =
      '<span class="text-danger m-3">email already exists</span>';
  } 
  else if(validitionName() == false){
    document.getElementById("alert").innerHTML =
    '<span class="text-danger m-3">Name must be greater than 3 character</span>';
  }
  else if(validitionEmail() == false){
    document.getElementById("alert").innerHTML =
    '<span class="text-danger m-3">Email is invalid (ex: EmailExample@gmail.com)</span>';
  }
  else if(validitionPass() == false){
    document.getElementById("alert").innerHTML =
    '<span class="text-danger m-3">Password must be 8 character or more</span>';
  }
  else {
    signupContainer.push(info);
    localStorage.setItem("users", JSON.stringify(signupContainer));
    document.getElementById(
      "alert"
    ).innerHTML = `<span class="text-success m-3">Success</span>`;
  }
}

// ================ login ================

function isLoginEmpty() {
  if (signinEmail.value == "" || signinPassword.value == "") {
    return true;
  } else {
    return false;
  }
}
var path = location.pathname.split("/");
var baseUrl = "";
for (var i = 0; i < path.length - 1; i++) {
  baseUrl += "/" + path[i];
}

function login() {
  if (isLoginEmpty() == true) {
    document.getElementById(
      "incorrect"
    ).innerHTML = `<span class="text-danger m-3">All inputs is required</span>`;
    return false;
  }
  var email = signinEmail.value;
  var password = signinPassword.value;
  var correct = 0;
  for (var i = 0; i < signupContainer.length; i++) {
    if (
      signupContainer[i].email.toLowerCase() == email.toLowerCase() &&
      signupContainer[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", signupContainer[i].name);
      window.location = "./home.html";
      correct = 1;
      break;
    }
  }
  if (correct == 0) {
    document.getElementById(
      "incorrect"
    ).innerHTML = `<span class="p-2 text-danger">incorrect email or password</span>`;
  }
}

// ==================== logout ====================

function logout() {
  localStorage.removeItem("sessionUsername");
}
