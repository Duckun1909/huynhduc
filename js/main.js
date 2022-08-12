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

//Ticker
let localDate = new Date();
let date = localDate.getDate();
let month = localDate.getMonth();
let year = localDate.getFullYear();
let day = localDate.getDay();
let hour = localDate.getHours();
let minute = localDate.getMinutes();
let second = localDate.getSeconds();

let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dayName = dayNames[day];
let monthName = monthNames[month];
let time = hour + ':' + minute + ':' + second;

$('#Date')[0].innerText = dayName + ' ' + date + ' ' + monthName + ' ' + year;
$('#hours')[0].innerText = hour;
$('#min')[0].innerText = minute;
$('#sec')[0].innerText = second;

setInterval(function(){
    $('#sec')[0].innerText = ++second;
    console.log(second);
    if(second<10){
        $('#sec')[0].innerText = '0' + second;
    }
    if(second == 60){
        second = 0;
        $('#sec')[0].innerText = '0' + second;
        $('#min')[0].innerText++;
    }

    if($('#min')[0].innerText==60){
        $('#min')[0].innerText = 0;
        $('#hours')[0].innerText++;
    }

    if($('#hours')[0].innerText==24){
        $('#hours')[0].innerText = 0;
        $('#min')[0].innerText = 0;
        second = 0;
    }
}, 1000);
