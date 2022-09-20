async function signupFormHandler(e) {
  e.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    // check the response status
    // if (response.ok) {
    //   fetch('/api/users/login', {
    //     method: 'post',
    //     body: JSON.stringify({
    //       username,
    //       password,
    //     }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    //   document.location.replace('/');
    // }
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);