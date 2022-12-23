const loginHandler = async (event) => {
    event.preventDefault();

    // Get values for login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(username + ' ' + password);
    if (username && password) {
        const respond = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (respond.ok) {
            document.location.replace("/dashboard");
        } else {
            let validate = $('#validate');
            validate.text("Username or password was incorrect!").show().fadeOut(1500);
        }
    }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginHandler);
