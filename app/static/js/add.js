token = localStorage.getItem("token");
if(token === null){
  window.location.href = '/signin';
  }

else {
add = () => {
document.getElementById("entry").addEventListener("submit", function (e) {
    e.preventDefault();
    data = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value
    };

token = localStorage.getItem("token");
fetch('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries',{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(data)

})
        .then(res => res.json())

        .then(data => {
            console.log(data.message)
            if(data.message === "successfully added"){
                let msg = data.message;
                document.getElementById("white").innerHTML = msg;
                window.location.href = "/home";
            }
            else{
                let msg = Object.values(data);
                document.getElementById("white").innerHTML = msg;
            }
        })

        .catch(error => console.error("Error:", error));

  });
}
}











