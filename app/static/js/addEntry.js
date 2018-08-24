// Gets stored token in the browser storage
token = localStorage.getItem("token");
// Checks whether the user is authenticated
if(token === null){
  window.location.assign('/signin');
  }

else {
// Gets data from the form inputs if the user is authenticated.
document.getElementById("entry").addEventListener("submit", function (e) {
    e.preventDefault();
    data = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value
    };
// Calls this function for entry processing
    addEntry();
  });
}
// Sends the added entry to they server for processing.
const addEntry = () => {
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
                document.getElementById("info").innerHTML = msg;
                window.location.assign("/home");
            }
            else{
                let msg = Object.values(data);
                document.getElementById("info").innerHTML = msg;
            }
        })
// catches any error that may occur.
        .catch(error => console.error(error));
    };