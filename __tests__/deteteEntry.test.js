describe("Delete entry", () => {
let fetchMock;
let assignMock;

beforeEach(() => {

document.body.innerHTML +=`
<article>
<h4 id="success" class="text_centered"></h4>
<h4 id="fail" class="text_centered"></h4>
<div class="container"><button id="delete" onclick="deleteEntry()">delete</button></div>
</article>`;
fetchMock = jest.spyOn(global, 'fetch');
fetchMock.mockImplementation(() =>Promise.resolve({
    json :() =>({message:"Your entry was successfully deleted"})
}));
assignMock = jest.spyOn(window.location, 'assign');
assignMock.mockImplementation(() =>{});
require('../app/static/js/deleteEntry')
});
afterEach(()=>{
    fetchMock.mockRestore();
    assignMock.mockRestore();
    jest.resetModules();
});
it("deletes an entry and redirects to home page", async () =>{
    window.history.pushState({}, "delete", "https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/1");
    entryId = Number(location.pathname.match(/\d+/)[0]);
    document.getElementById('delete').click();
    const token = localStorage.getItem("token");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/1');
    expect(fetchArgs[1]).toEqual({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      await Promise.resolve().then();

        expect(assignMock).toHaveBeenCalledTimes(1);
        expect(assignMock.mock.calls[0][0]).toBe('/home');
        expect(document.getElementById('success').innerHTML).toBe('Your entry was successfully deleted');
});

it("raises an error ", async () => {
    fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockImplementation(() =>Promise.resolve({
        json :() =>({message:"An error occured"})
    }));
    window.history.pushState({}, 'delete', 'https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/1');
    entryId = Number(location.pathname.match(/\d+/)[0]);
    const token = localStorage.getItem("token");
    document.getElementById('delete').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/1');
    expect(fetchArgs[1]).toEqual({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      await Promise.resolve().then();
        expect(document.getElementById('fail').innerHTML).toBe('An error occured');
});
});