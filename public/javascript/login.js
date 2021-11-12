async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-create').value.trim();
    
    const password = document.querySelector('#password-create').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Should bring user to dashboard
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }   
    }
};

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}
  
document.querySelector('.signup').addEventListener('submit', signupFormHandler);
document.querySelector('.login').addEventListener('submit', loginFormHandler);