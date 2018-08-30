
describe("Modify entry", () => {
    let fetchMock;
    let assignMock;

    beforeEach(() => {
    document.body.innerHTML +=`
    <div id="success"></div>
    <div id="fail"></div>
    <form class="container" id="modify">
        <input type="text" id="title" placeholder="Give your Entry a Title" value="new Title" required>
        <input type="text" id="content" placeholder="Your contents goes here...." rows="10" cols="70" value="updated content" required></textarea>
        <button id="update" onclick="modify()">update</button>
    </form>`;
    fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockImplementation(() => Promise.resolve({
    json :() => ({message:"Entry Updated successfully"})
    }));
    assignMock = jest.spyOn(window.location, 'assign');
    assignMock.mockImplementation(() =>{});
    modify = require('../app/static/js/modifyEntry')
    });
    afterEach(()=>{
        fetchMock.mockRestore();
        assignMock.mockRestore();
        jest.resetModules();
    });

    it("should upadate an entry using it's id", async () => {
        const token = localStorage.getItem("token");
        entryId = Number(location.pathname.match(/\d+/)[0]);
        window.history.pushState({}, 'delete', 'https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/${entryId}');
        document.getElementById("update").click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/1');
        expect(fetchArgs[1]).toEqual({
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
              title: "new Title",
              content: 'updated content'
          })
        });
        await Promise.resolve().then();
        expect(document.getElementById('success').innerHTML).toBe('Entry Updated successfully');
        expect(assignMock).toHaveBeenCalledTimes(1);
        expect(assignMock.mock.calls[0][0]).toBe('/detail/1');

    });
    it("should change content of #fail if an error occurs", async () => {
        fetchMock = jest.spyOn(global, 'fetch');
        fetchMock.mockImplementation(() => Promise.resolve({
            json :() => ({message:"Entry cannot be updated because it was not created today"})
            }));
        const token = localStorage.getItem("token");
        entryId = Number(location.pathname.match(/\d+/)[0]);
        window.history.pushState({}, 'delete', 'https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/${entryId}');
        document.getElementById('update').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/1');
        expect(fetchArgs[1]).toEqual({
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
              title: "new Title",
              content: 'updated content'
          })
        });
        await Promise.resolve().then();
        expect(document.getElementById('fail').innerHTML).toBe('Entry cannot be updated because it was not created today');
    });
    it("makes sure that title and description are loaded in form fields", async () => {
        const token = localStorage.getItem("token");
        fetchMock = jest.spyOn(global, 'fetch');
        fetchMock.mockImplementation(() => Promise.resolve({
        json: () => ({massage:"Entry fetched Successuflly"})
    }));
        require('../app/static/js/modifyEntry');
        window.document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
          }));
            expect(fetchMock).toHaveBeenCalledTimes(3);
            const fetchArgs = fetchMock.mock.calls[0];
            expect(fetchArgs[0]).toBe("https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/1");
            expect(fetchArgs[1]).toEqual({
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            })
            await Promise.resolve().then();
            expect(document.getElementById('title').value).toBe('new Title');
            expect(document.getElementById('content').value).toBe('updated content');
      });
    });