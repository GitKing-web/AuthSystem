
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const signupBtn = document.querySelector('.btn');

signupBtn?.addEventListener('click', async function(e){
    e.preventDefault();

    if(password.value!== confirmPassword.value){
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            })
        })
    if(response.status === 201){
        alert('Signup successful');
        window.location.href = '/login';
    }else{
        alert('Signup failed');
        console.log(response);
    }
    } catch (error) {
        console.log(error);
    }
});

const loginUsername = document.querySelector('#loginUsername');
const loginPassword = document.querySelector('#loginPassword');
const loginBtn = document.querySelector('.loginBtn');

loginBtn?.addEventListener('click', async (e) => {
    e.preventDefault();

    let loginData = loginUsername.value;
    let bodyData;

    if(loginData.includes('@')){
        bodyData = {
            email: loginData,
            password: loginPassword.value
        }
    }else{
        bodyData = {
            username: loginData,
            password: loginPassword.value
        }
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                bodyData
            )
        })
    const data = await response.json()
    if(response.status === 200){
        alert('Login successful')
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';

        const getDashboard = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            if(!token){
                alert('You are not logged in, redirecting to login...')
                window.location.href = '/login'
                return;
            }
        
            fetch('/dashboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
        }
        getDashboard();

    }else{
        alert('Login failed')
        console.log(response);
    }
    } catch (error) {
        console.log(error);
    }
});

