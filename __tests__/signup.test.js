describe('singup', () => {

  let fetchMock;
  let assignMock;
// setup megthod
  beforeEach(() => {
    document.body.innerHTML += `
      <form id="signup">
        <input type="text" id="username" value="the username">
        <input type="text" id="email" value="the email">
        <input type="text" id="password" value="the password">
        <input type="text" id="confirmPassword" value="the confirmPassword">
        <input type="submit" id="submitbutton">
      </form>
      <div id="white"></div>
    `;
    fetchMock = jest.spyOn(global, 'fetch');
     fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ message: "Your account was created" })
    }));
    assignMock = jest.spyOn(window.location, 'assign');
    assignMock.mockImplementation(() => {});
    // now run the code
    require('../app/static/js/test_files/signup');
  });
// Teardown method
  afterEach(() => {
    fetchMock.mockRestore();
    assignMock.mockRestore();
    jest.resetModules();
  });
// Test
  it('should fetch data, change contents of #white, and change the page location on submit', async () => {
    document.getElementById('submitbutton').click();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/register');
    expect(fetchArgs[1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: 'the username',
        email: 'the email',
        password: 'the password',
        confirm_password: 'the confirmPassword',
      })
    });

    // pause synchronous execution of the test for two event loop cycles
    // so the callbacks queued by the then()'s within signUp have a chance to run
    await Promise.resolve().then();

    expect(assignMock).toHaveBeenCalledTimes(1);
    expect(assignMock.mock.calls[0][0]).toBe('/signin');

    expect(document.getElementById('white').innerHTML).toBe('Your account was created');
  });


  it('tests if password match ', async () => {
    document.getElementById('password').value = 'Wrong password';
    fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ message: 'Double check your password'})
    }));
    document.getElementById('submitbutton').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/register');
    await Promise.resolve().then();
    expect(document.getElementById('white').innerHTML).toBe('Double check your password');
  });

  it('test if password are 8 characters', async () => {
    document.getElementById('password').value = 'Wrong';
    fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ message: 'Password length should be atleast 8 characters'})
    }));
    document.getElementById('submitbutton').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/register');
    await Promise.resolve().then();
    expect(document.getElementById('white').innerHTML).toBe('Password length should be atleast 8 characters');
  });
  it('test registration with exixting email', async () => {
    document.getElementById('email').value = 'the email';
    fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ message: 'User with email: teezjay11@gmail.com exists'})
    }));
    document.getElementById('submitbutton').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('https://diaryapi-v2.herokuapp.com/mydiary/v1/auth/register');
    await Promise.resolve().then();
    expect(document.getElementById('white').innerHTML).toBe('User with email: teezjay11@gmail.com exists');
  })
});
