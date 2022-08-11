$('#login').on('submit', function (e) {
    e.preventDefault();
    var loginemail = $('#email').val();
    var loginpassword = $('#password').val();
    var lst_user =  [];
    let checklogin = 0;
    lst_user = JSON.parse(localStorage.getItem('lst_user'));

    lst_user.forEach( (elem,index) => {
        if((elem.password == loginpassword && elem.email == loginemail)){
            checklogin = 1 ;
        }
    });
    if(checklogin == 0 ){
        var form = $('form');
        var error= document.createElement('div');
        error.innerHTML = `<div class="error">Invalid email or password</div>`;
        form.append(error);
    }else{
        this.submit();
    }
});