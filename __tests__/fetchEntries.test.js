describe("fetch", () => {
  let fetchMock;

  beforeEach(() => {
    document.body.innerHTML += `
      <p id="total"></p>
    `
    fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => ({message:"Your diary is empty"})
    }));
    require('../app/static/js/fetchEntries')
  });

  afterEach(() => {
    fetchMock.mockRestore();
    jest.resetModules();
  });
  it('should fetch data and change the content of #total', async () => {
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/entries');
    expect(fetchArgs[1]).toEqual({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // pause synchronous execution of the test for two event loop cycles
    // so the callbacks queued by the then()'s within signUp have a chance to run
    await Promise.resolve().then();
    expect(document.getElementById('total').innerHTML).toBe('All your entries will appear here.');
  });
});
