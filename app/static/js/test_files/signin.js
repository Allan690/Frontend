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
          let res = Object.values(data);
          const access_token = res[0];
          if (data.token === access_token) {
            msg = "Login was successful";
            document.getElementById('white').innerHTML = msg;
            localStorage.setItem('token', access_token);
            window.location.assign("/home");
          } else {
            let msg = Object.values(data);
            document.getElementById('white').innerHTML = msg;
          }

        })
      .catch(error => console.error("Error:", error));

  };
