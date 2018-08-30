describe('addEntry',() => {
    let fetchMock;
    let assignMock;
    beforeEach(() => {
        document.body.innerHTML += `
        <div id="success"></div>
          <div id="fail"></div>
        <form id="entry">
        <input type="text" id="title" value="Andela">
        <input type="text" id="content" value="This is Andela">
        <input type="submit" id="submitbutton">
        </form>
        `;
        fetchMock = jest.spyOn(global, 'fetch')
        fetchMock.mockImplementation(() => Promise.resolve({
            json: () =>({message:"successfully added"})
        }));
        assignMock = jest.spyOn(window.location, 'assign');
        assignMock.mockImplementation(() => {});
        require("../app/static/js/addEntry")
    });

    afterEach(() => {
        fetchMock.mockRestore()
        assignMock.mockRestore();
        jest.resetModules();
    });

    it("should call fetch with data,change contents of #info and change window location to /home", async () => {
        document.getElementById('submitbutton').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries')
        expect(fetchArgs[1]).toEqual({
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            'title':"Andela",
            'content':"This is Andela"
          })
        });
        // pause synchronous execution of the test for two event loop cycles
        // so the callbacks queued by the then()'s within signUp have a chance to run
        await Promise.resolve().then();

        expect(assignMock).toHaveBeenCalledTimes(1);
        expect(assignMock.mock.calls[0][0]).toBe('/home');

        expect(document.getElementById('success').innerHTML).toBe("successfully added");
    });
    it("should alert user if title exists", async () => {
      fetchMock = jest.spyOn(global, 'fetch')
      fetchMock.mockImplementation(() => Promise.resolve({
          json: () =>({message:"Title already exist, use a different one."})
      }));
        document.getElementById('submitbutton').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries')
        expect(fetchArgs[1]).toEqual({
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            'title':"Andela",
            'content':"This is Andela"
          })
        });
        // pause synchronous execution of the test for two event loop cycles
        // so the callbacks queued by the then()'s within signUp have a chance to run
        await Promise.resolve().then();
        expect(document.getElementById('fail').innerHTML).toBe("Title already exist, use a different one.");
    });
});
