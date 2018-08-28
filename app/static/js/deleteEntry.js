  deleteEntry = () => {
    if (!confirm(`Are you sure want to delete this entry?`))
             return false;
    else{
    const entryId = Number(location.pathname.match(/\d+/)[0]);
    const token = localStorage.getItem("token");
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
            let msg = "Entry was deleted from your diary";
            document.getElementById('success').innerHTML = msg;
            window.location.href = '/home';
        }
        else {
          let msg = Object.values(data);
          document.getElementById("fail").innerHTML = msg;
        }
}).catch(err => console.error(err));
}};

