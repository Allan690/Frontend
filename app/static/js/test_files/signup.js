document.getElementById("signup").addEventListener("submit", function (e) {
  e.preventDefault();
  // add 'const'
  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirm_password: document.getElementById("confirmPassword").value,
  };
  signUp(data); // call signUp with the data
});

// add 'const'
const signUp = (data) => {

  fetch("https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())

    .then(data => {
      if (data.message === "Your account was created") {
        let msg = data.message;
        document.getElementById("white").innerHTML = msg;
        window.location.assign("/signin"); // change this to assign() so it can be mocked
      } else {
        let msg = Object.values(data);
        document.getElementById("white").innerHTML = msg;
      }

    })
    .catch(error => console.error("Error:", error));

}
