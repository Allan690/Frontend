  deleteEntry = () => {
    if (!confirm(`Are you sure want to delete this entry?`))
             return false;
    else{
    const entryId = Number(location.pathname.match(/\d+/)[0]);
    token = localStorage.getItem("token");
    const url = `https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/${entryId}`;
    fetch(`${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
    })
    .then(res => res.json())
    .then(data => {
        if (data.message == "Your entry was successfully deleted"){
            document.getElementById('success').innerHTML =data.message;
            window.location.assign('/home');
        }
        else {
          document.getElementById("fail").innerHTML = Object.values(data);
        }
}).catch(err => console.log(err));
}};

