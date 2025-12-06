document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-inputs .btn button');
    const eyeIcon = document.getElementById('eyePassword');

    const setError = (input, message) => {
        const parent = input.parentElement;
        const errorDisplay = parent.querySelector('.message-error');
        parent.classList.add('error');
        parent.classList.remove('success');
        if (errorDisplay) {
            errorDisplay.textContent = message;
        }
    };

    const setSuccess = (input) => {
        const parent = input.parentElement;
        const errorDisplay = parent.querySelector('.message-error');
        parent.classList.remove('error');
        parent.classList.add('success');
        if (errorDisplay) {
            errorDisplay.textContent = '';
        }
    };

    const validateUserName = () => {
        const userNameValue = userNameInput.value.trim();
        const minLength = parseInt(userNameInput.getAttribute('minlength'));
        
        if (userNameValue === '') {
            setError(userNameInput, 'El nombre de usuario no puede estar vacío.');
            return false;
        } else if (userNameValue.length < minLength) {
            setError(userNameInput, `El nombre de usuario debe tener al menos ${minLength} caracteres.`);
            return false;
        } else {
            setSuccess(userNameInput);
            return true;
        }
    };

    const validatePassword = () => {
        const passwordValue = passwordInput.value.trim();
        const minLength = parseInt(passwordInput.getAttribute('minlength'));
        
        if (passwordValue === '') {
            setError(passwordInput, 'La contraseña no puede estar vacía.');
            return false;
        } else if (passwordValue.length < minLength) {
            setError(passwordInput, `La contraseña debe tener al menos ${minLength} caracteres.`);
            return false;
        } else {
            setSuccess(passwordInput);
            return true;
        }
    };

    if (eyeIcon) {
        eyeIcon.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
        });
    }

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogin();
    });

    userNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    const handleLogin = () => {
        const isUserNameValid = validateUserName();
        const isPasswordValid = validatePassword();

        if (isUserNameValid && isPasswordValid) {
            const userName = userNameInput.value.trim();
            localStorage.setItem('currentUser', userName);
            alert(`¡Bienvenido, ${userName}! Inicio de sesión exitoso. Redirigiendo a Dashboard.`);
            window.location.href = 'dashboard.html';
        }
    };
});
