let users = JSON.parse(localStorage.getItem('users')) || [];


function register() {
    let newUsername = document.getElementById('new-username').value;
    let newPassword = document.getElementById('new-password').value;

   
    if (users.find(user => user.username === newUsername)) {
        document.getElementById('register-message').innerText = "Username already taken.";
        return;
    }

    let hashedPassword = sha256(newPassword);

    
    users.push({ username: newUsername, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('register-message').innerText = "Registration successful. You can now login.";
}

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

   
    let user = users.find(user => user.username === username);

  
    if (!user || user.password !== sha256(password)) {
        document.getElementById('error-message').innerText = "Incorrect username or password.";
        return;
    }

    
    document.getElementById('error-message').innerText = "";
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('secured-page').style.display = 'block';
}


function logout() {
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('error-message').innerText = "";
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('secured-page').style.display = 'none';
}
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-link').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('register-link').style.display = 'block';
}


function sha256(plainText) {
    const hash = crypto.subtle.digest('SHA-256', new TextEncoder().encode(plainText));
    return hex(hash);
}


function hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}