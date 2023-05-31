// signup

const signUser = document.querySelector('.signusername');
const email = document.querySelector('.email');
const signPass = document.querySelector('.signpassword');
const signupButton = document.querySelector('.signup');
const errmsg = document.querySelector('.errmsg');
const errmsg1 = document.querySelector('.errmsg1');
const msg = document.querySelector('.msg');
const rem = document.querySelector('.rem');

//
const txt = document.querySelector('.txt');
//

const Logusername = document.querySelector('.username');
const Logpassword = document.querySelector('.password');
const LoginButton = document.querySelector('.login');


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
    if(signUser.value == '' || email.value == '' || signPass.value == ''){
        errmsg.style.display = 'block';
    }
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
    .catch(error => {
        if(error){
            console.log(error.message);
        }
    })
}

LoginButton?.addEventListener('click', e => {
    e.preventDefault();
    if(Logusername.value == '' || Logpassword.value == ''){
        errmsg.style.display = 'block'
    }
    HandleLogin();
});

rem.addEventListener('click', e => {
    e.preventDefault();
    errmsg.style.display = 'none';
});