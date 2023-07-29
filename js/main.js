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
  } else {
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
      if (baseUrl === "/") {
        window.location.href =
          "https://" + window.location.hostname + "/home.html";
      } else {
        window.location.href = baseUrl + "/home.html";
      }
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
