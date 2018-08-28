describe("single", () => {
  let fetchMock;
  beforeEach(() => {
    document.body.innerHTML += `
      <h1 id="title"></h1>
      <p id="date"></p>
      <h2 id="content"></h2>
    `;
    fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => ({message:"Entry fetched Successuflly"})
    }));
    // require('..app/static/js/test_files/single');
    require('../app/static/js/test_files/single');
  });
  afterEach(() => {
    fetchMock.mockRestore();
  });
  it('should call fetch and change the contents of #title,#date,#content', async () =>{
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe(`https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/2`);
    expect(fetchArgs[1]).toEqual({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      await Promise.resolve().then();
      expect(document.getElementById("title").innerHTML).not.toBeNull()
      expect(document.getElementById("date").innerHTML).not.toBeNull()
      expect(document.getElementById("content").innerHTML).not.toBeNull()
  });
});
