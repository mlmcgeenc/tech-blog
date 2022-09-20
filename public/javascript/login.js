async function loginFormHandler(e) {
  e.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(`login form submitted, ${username}, ${password}`);

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

// async function signupFormHandler(e) {
//   e.preventDefault();

//   const username = document.querySelector('#username-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();

//   if (username && password) {
//     const response = await fetch('/api/users', {
//       method: 'post',
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     // check the response status
//     // if (response.ok) {
//     //   fetch('/api/users/login', {
//     //     method: 'post',
//     //     body: JSON.stringify({
//     //       username,
//     //       password,
//     //     }),
//     //     headers: { 'Content-Type': 'application/json' },
//     //   });
//     //   document.location.replace('/');
//     // }
//     if (response.ok) {
//       document.location.replace('/dashboard/');
//     } else {
//       alert(response.statusText);
//     }
//   }
// }


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);