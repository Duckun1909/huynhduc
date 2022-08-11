function user(username,email,password) {
    this.username = username;
    this.email = email;
    this.password = password;
}

$('#register').on('submit',function(e){
    e.preventDefault();
    console.log(1);
    let lst_user = [];
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var comfirmpassword = $('#confirmpassword').val();
    var agree = $('input[name="agree"]:checked');
    
    var local_user = localStorage.getItem('lst_user');

    if(comfirmpassword == password){
        var new_user = new user(username, email, password);
        lst_user.push(new_user);
        console.log(lst_user);
        localStorage.setItem('lst_user', JSON.stringify(lst_user));
    }else{
        var form = $('#register');
        var error= document.createElement('div');
        error.innerHTML = `<div class="error">Passwords do not match</div>`;
        form.append(error);
    }
});
