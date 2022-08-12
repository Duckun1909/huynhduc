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
    
    $('.btn-login').click(()=>{
        $.ajax({
            url: '../login.html',
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                $('.body').html(data);
            }
        })
    })
  })

$('.containers ul li').click(function(e) {
    $(this).addClass('nav-active').siblings().removeClass('nav-active');
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

let checkMin = 0;
let checkHour = 0
let min = $('#min')[0].innerText;
let hours = $('#hours')[0].innerText;
console.log(min)
setInterval(function () {
  $('#sec')[0].innerText = ++second;
  if (second < 10) {
    $('#sec')[0].innerText = '0' + second;
  }
  if (second == 60) {
    second = 0;
    $('#sec')[0].innerText = '0' + second;
    min = ++minute;
    if (min < 10) {
      $('#min')[0].innerText = '0' + min;
    } else {
      $('#min')[0].innerText = min;
    }
  }

  if ($('#min')[0].innerText < 10 && checkMin == 0) {
    $('#min')[0].innerText = '0' + min;
    checkMin = 1;
  } else{
    checkMin = 0
  }


  if(min==60){
    min = 0;
    $('#min')[0].innerText = '0' + min;
    hours = ++hour;
    if (hours < 10) {
      $('#hours')[0].innerText = '0' + hours;
    } else {
      $('#hours')[0].innerText = hours;
    }
  }

  if($('#hours')[0].innerText<10 && checkHour == 0){
    $('#hours')[0].innerText = '0' + hours;
    checkHour = 1;
  }else{
    checkHour = 0;
  }

}, 1000);
