const logOutBtn = document.querySelector('.nav__el--logout')
const logout = async () =>{
    try{
        const res = await axios({
            method : 'GET',
            url: '/api/v1/users/logout',
            data : {
                data : null
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Log Out successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    }catch (err){
        console.log(err.response);
        showAlert('error','Error logging out Try again')
    }
}

if(logOutBtn) logOutBtn.addEventListener('click',logout)

