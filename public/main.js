// signup

const signUser = document.querySelector('.signusername');
const email = document.querySelector('.email');
const signPass = document.querySelector('.signpassword');
const signupButton = document.querySelector('.signup');

const Logusername = document.querySelector('.username');
const Logpassword = document.querySelector('.password');
const LoginButton = document.querySelector('.login')


function HandleSignup(){
    fetch('/auth/test/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: signUser.value,
            email: email.value,
            password: signPass.value
        })
    })
    .then(res => res.json)
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

signupButton?.addEventListener('click', e => {
    e.preventDefault();
    HandleSignup();
});

function HandleLogin() {
    fetch('/auth/test/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: Logusername.value,
            password: Logpassword.value
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

LoginButton?.addEventListener('click', e => {
    e.preventDefault();
    HandleLogin();
})