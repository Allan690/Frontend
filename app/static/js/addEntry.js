token = localStorage.getItem('token')
// Gets data from the form inputs if the user is authenticated.
document.getElementById("entry").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value
    };
// Calls this function for entry processing
    addEntry(data);
  });
// Sends the added entry to they server for processing.
const addEntry = (data) => {
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
            if(data.message === "successfully added"){
                let msg = data.message;
                document.getElementById("success").innerHTML = msg;
                window.location.assign("/home");
            }
            else if(data.message === "Title already exist, use a different one.") {
                document.getElementById("fail").innerHTML = data.message;
            }
        })
// catches any error that may occur.
        .catch(error => console.error(error));
    };
