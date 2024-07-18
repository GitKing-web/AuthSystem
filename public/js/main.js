
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const signupBtn = document.querySelector('.btn');

signupBtn.addEventListener('click', async function(e){
    e.preventDefault();

    if(password.value!== confirmPassword.value){
        alert('Passwords do not match');
        return;
    }

    try {
        const response =  await axios.post('/signup', {
            username: username.value,
            email: email.value,
            password: password.value
        })

    response.status == 201 ? console.log('created') : console.log('error1')
    } catch (error) {
        console.log(error);
    }
})