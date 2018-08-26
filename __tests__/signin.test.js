describe('signin',() => {
    let fetchMock;
    let assignMock;

    beforeEach(() => {
        document.body.innerHTML +=`
        <p id="white"></p>
        <form id="signin">
          <input type="email" id="userEmail" value="test@gmail.com">
          <input type="password"  id="userPassword" value ="test1234">
          <input type="submit" id="submit">
        </form>`;
        fetchMock = jest.spyOn(global,'fetch');
        fetchMock.mockImplementation(() =>Promise.resolve ({
            json: () => Promise.resolve({message:"Your password was Incorrect, please double check it."})
        }));
        assignMock = jest.spyOn(window.location , 'assign');
        assignMock.mockImplementation(() =>{});
        require('../app/static/js/test_files/signin');
    });
    afterEach(() => {
        fetchMock.mockRestore();
        assignMock.mockRestore();
    });
    it('fetch data and change the content of #white', async () =>{
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1)
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/login');
        expect(fetchArgs[1]).toEqual({
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: 'test@gmail.com',
              password: "test1234"
            })

        });
        await Promise.resolve().then();
        expect(document.getElementById('white').innerHTML).toBe("Your password was Incorrect, please double check it.");
    });


});
