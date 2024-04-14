document.addEventListener('DOMContentLoaded', () => {

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignin);
    }
});


function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    const signupData = {
        username: username,
        password: password,
        email: email
    };

    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
    })
    .then(response => {
        if (response.ok) {
            alert('Signup successful. Please sign in.');
            window.location.href = 'signin.html';
        } else {
            alert('Signup failed. Please try again.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error during signup. Please try again.');
    });
}

function handleSignin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const signinData = {
        username: username,
        password: password
    };

    fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signinData),
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Signin failed');
        }
    })
    .then(token => {
        sessionStorage.setItem('token', token);
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Signin failed. Please check your credentials and try again.');
    });
}