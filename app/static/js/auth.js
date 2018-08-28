// Register new user
signUp = () => {
  document.getElementById("signup").addEventListener("submit", function(e) {
    e.preventDefault();
    data = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirm_password: document.getElementById("confirmPassword").value,
    };
    // send registration details to the server
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
          document.getElementById("success").innerHTML = msg;
          window.location.href = "/signin";
        } else {
          let msg = Object.values(data);
          console.log(msg)
          document.getElementById("fail").innerHTML = msg;
          setTimeout(() => {document.getElementById("fail").innerHTML = "";}, 5000);

        }

      })
      // catch error that may occur
      .catch(error => console.log(error));
  });

}
// Login existing users
 signIn = () => {
  document.getElementById('signin').addEventListener('submit', function(e) {
    e.preventDefault();

    data = {
      email: document.getElementById("userEmail").value,
      password: document.getElementById("userPassword").value
    };
    // send login details to the server
    fetch("https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        let res = Object.values(data);
        console.log(res[0])
        const access_token = res[0];
        if (data.token === access_token) {
          msg = "Login was successful";
          document.getElementById('success').innerHTML = msg;
          localStorage.setItem('token', access_token);
          window.location.href = "/home";
        } else {
          let msg = Object.values(data);
          console.log(msg)
          document.getElementById('fail').innerHTML = msg;
          setTimeout(() => {document.getElementById("fail").innerHTML = "";}, 5000);
        }

      })
    // catch error that may occur
    .catch(error => console.error(error));

  });

}
