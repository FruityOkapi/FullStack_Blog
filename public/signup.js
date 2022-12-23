const signupHandler = async (event) => {
    event.preventDefault();

    // Get values for login form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const respond = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });

        if (respond.ok) {
            location.replace("/dashboard");
        } else {
            let validate = $('#validate');
            validate.text("Sorry something went wrong!").show().fadeOut(1500);
        }
    }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupHandler);
