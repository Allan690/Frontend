// Register user

const signUp = () => {
    document.getElementById("signup").addEventListener("submit", function (e) {
  e.preventDefault();
  data = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirm_password: document.getElementById("confirmPassword").value,
  };

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
              window.location.href = "/signin";
          }
          else {
              let msg = Object.values(data);
              console.log(msg)
              document.getElementById("white").innerHTML = msg;
          }

      })
      .catch(error => console.error("Error:", error));
});

}


