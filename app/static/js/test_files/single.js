token = localStorage.getItem("token");
const url = `https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/2`;
fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }

  })
  .then(res => res.json())
  .then(data => {
    let msg = `Entry fetched Successuflly`;
    document.getElementById("title").innerHTML = data[msg]
    document.getElementById("date").innerHTML = data[msg]
    document.getElementById("content").innerHTML = data[msg]

  });
