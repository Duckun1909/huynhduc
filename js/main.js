$(document).ready(function() {
    $('.btn-regis').click(()=>{
        $.ajax({
            url: './register.html',
            type: 'POST',
            data: 'html',
            success: function(data) {
                $('.body').html(data);
            }
        })
    })
  })