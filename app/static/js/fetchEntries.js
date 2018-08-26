token = localStorage.getItem("token");
fetch('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }

  })
  .then(res => res.json())
  .then(data => {

    if (data.message === "Your diary is empty") {
      let msg = 'All your entries will appear here.'
      document.getElementById('total').innerHTML = msg;
    } else {
      let entries = data.all_entries
      let i;
      for (i = 0; i < entries.length; i++) {
        document.getElementById('entries-list').innerHTML += `
        <tr>
        <td>${entries[i].date}</td>
        <td><li><a href="/detail/${entries[i].id}">${entries[i].title}</a></li></td>
        <td><li><a href="/modify/${entries[i].id}"> Edit</a></li></td>
        </tr>`

      }
      let msg = "Total entries "
      document.getElementById('total').innerHTML = msg + entries.length;
    }

  });
