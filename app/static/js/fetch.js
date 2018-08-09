

token = localStorage.getItem("token");
fetch('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries',{
  method:"GET",
  headers:{
    "Content-Type":"application/json",
    Authorization: `Bearer ${token}`
  }

})
.then(res =>res.json())
.then(data => {
  console.log(data.all_entries);
  let entries = data.all_entries
  let i;
    for (i = entries.length-1;i>0; i--) {
      console.log(entries.length)
      document.getElementById('entries-list').innerHTML +=  `
      <tr>
      <td>${entries[i].date}</td>
      <td>${entries[i].title}</td>
      <td><li><a href="/detail/${entries[i].id}"> View</a></li></td>
      <td><li><a href="/modify/${entries[i].id}"> Edit</a></li></td>
      </tr>`

    }
    document.getElementById('total').innerHTML = entries.length;

});
