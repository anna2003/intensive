const auth = () => {
    const buttonAuth = document.querySelector('.button-auth')
    const modalAuth = document.querySelector('.modal-auth')
    const buttonOut = document.querySelector('.button-out')
    const userName = document.querySelector('.user-name')
    
    const closeAuth = document.querySelector('.close-auth')
    const loginError = document.querySelector('.login-error')
    const logInForm = document.getElementById('logInForm')
    const inputLogin = document.getElementById('login')
    const inputPassword = document.getElementById('password')
    const buttonCart = document.querySelector('.button-cart')
    
    const login = (user) => {
        buttonAuth.style.display='none';
        
        buttonOut.style.display='flex';
        userName.style.display='flex';
        buttonCart.style.display = 'flex'

        userName.textContent= user.login;
    
        modalAuth.style.display = 'none';
    }
    const logout = (user) => {
        buttonAuth.style.display='flex';
        
        buttonOut.style.display='none';
        userName.style.display='none';
        buttonCart.style.display = 'none'
        userName.textContent= '';
    
        localStorage.removeItem('user')
    }
    buttonOut.addEventListener('click', logout)
    
    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex';
        loginError.textContent = ''
    })
    
    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none';
    })
    
    logInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(inputLogin.value.trim().length >0) {
            const user={
                login: inputLogin.value,
                password: inputPassword.value
            };
            localStorage.setItem('user', JSON.stringify(user))
            login(user)
        } else {
            loginError.textContent = "Поле 'Логин' не может быть пустым..."
        }
        
    })
    
    if(localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')))
    }
}

export default auth