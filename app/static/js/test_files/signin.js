document.getElementById('signin').addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
      email: document.getElementById("userEmail").value,
      password: document.getElementById("userPassword").value
    };
    signIn(data)
  });

   const signIn = (data) => {
      fetch("https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('token', data.token);
          if (data.message === "Login was successful") {
            document.getElementById('white').innerHTML = data.message;
            window.location.assign("/home");
          } else {
            let msg = Object.values(data);
            document.getElementById('white').innerHTML = msg;
          }

        })
  };
