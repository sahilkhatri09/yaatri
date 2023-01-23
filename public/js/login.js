
const loginForm = document.querySelector('.form--login');

const login =async (email,password) =>{
    console.log(email,password);
    try{
        const res = await axios({
            method : 'POST',
            url :'api/v1/users/login',
            data : {
                email,password
            }
        });
        if(res.data.status === 'success'){
            showAlert('success','Logged in Successfully')
            window.setTimeout(()=>{
                location.assign('/');
            },1500)
        }
    }catch(err){
        showAlert('error',err.response.data.message);
    }

}


if(loginForm){
    loginForm.addEventListener('submit',e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password);
})}