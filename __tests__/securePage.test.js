describe('Should redirect to signin page if not logged in',() => {
    let assignMock;

    beforeEach(() => {
        assignMock = jest.spyOn(window.location, 'assign');
        assignMock.mockImplementation(() => {});
        require("../app/static/js/securePage.js")
    });

    afterEach(() => {
      assignMock.mockRestore();
      jest.resetModules();
    });
    it("Should redirect to signin page", async () =>{
        expect(assignMock).toHaveBeenCalledTimes(1);
        expect(assignMock.mock.calls[0][0]).toBe('/signin');
    });
});
