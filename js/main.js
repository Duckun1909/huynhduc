$(document).ready(function() {
    $.ajax({
        url: './home.html',
        type: 'GET',
        dataType: 'html',
        success: function(data) {
            $('.body').html(data);
            
            setTimeout(function() {
                let lst_product = [];
                let addCart_arr = $('.addCart')
                let prd_id;
                let cart_arr = []
                addCart_arr.click(function(){
                    prd_id = $(this).attr('cart-index');
                    $.ajax({
                        url: './data/data.json',
                        type: 'GET',
                        dataType: 'html',
                        success: function(data) {
                            lst_product = JSON.parse(data).product
                            $(lst_product).each(function(index, value){
                                if(prd_id == value.id){
                                    let checkCart = JSON.parse(localStorage.getItem('cart'))
                                    if(checkCart==null){
                                        cart_arr.push(value)
                                        localStorage.setItem('cart', JSON.stringify(cart_arr))
                                    }else{
                                        cart_arr = checkCart;
                                        $(cart_arr).each(function(index, value_local){
                                            if(value_local.id == prd_id){
                                                cart_arr.splice(index, 1)
                                            }
                                        })
                                        cart_arr.push(value)
                                        localStorage.setItem('cart', JSON.stringify(cart_arr))
                                        $('.cart-quantity span')[0].innerText = cart_arr.length;
                                        console.log(cart_arr)
                                        $('.cart-content_lst').html(null);
                                        $(cart_arr).each(function(index, value){
                                            var cart_html = `
                                                <div class="cart-content_item d-flex pb-3">
                                                    <i class="fa-solid fa-xmark btn-remove" remove-index="${value.id}"></i>
                                                    <a class="img" href="#"><img src="${value.image}" width="70px" alt=""></a>
                                                    <div class="decribe">
                                                    <a href="#">${value.name}</a>
                                                    <div class="price">
                                                        <span>${'$' + value.price}</span>
                                                        <span> x 1</span>
                                                    </div>
                                                    </div>
                                                </div>
                                            `
                                            $('.cart-content_lst').append(cart_html);
                                        })
                                    }
                                }
                            })
                            
                        }
                    })
                })
                renderCart();
                removeHandle();
            } , 1000);
        }
    })

    $('.btn-regis').click(()=>{
        $.ajax({
            url: 'register.html',
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                $('.body').html(data);
            }
        })
    })

    $('.btn-login').click(()=>{
        $.ajax({
            url: './login.html',
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                $('.body').html(data);
            }
        })
    })

    $('.btn-home').click(()=>{
        $.ajax({
            url: './home.html',
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                $('.body').html(data);
            }
        })
    })
    
    $('.btn-intro').click(()=>{
        $.ajax({
            url: './introduce.html',
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                $('.body').html(data);
            }
        })
    })

    $('.btn-contact').click(()=>{
        $.ajax({
            url: './contact.html',
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                $('.body').html(data);
            }
        })
    })
})
    

// Nav bar
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


// Visted
$( window ).on('load' ,function() {
    let visited = localStorage.getItem('visited');
    if(visited == null){
        localStorage.setItem('visited', '1');
    }else{
        localStorage.setItem('visited', ++visited);
        $('.visited .quantity')[0].innerText = visited;
    }
});


// Cart quantity
let cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart)
if(cart != null){
    $('.cart-quantity span')[0].innerText = cart.length;
}

// Render cart
var renderCart = ()=>{
    if(cart != null){
        $(cart).each(function(index, value){
            var cart_html = `
                <div class="cart-content_item d-flex pb-3">
                    <i class="fa-solid fa-xmark btn-remove" remove-index="${value.id}"></i>
                    <a class="img" href="#"><img src="${value.image}" width="70px" alt=""></a>
                    <div class="decribe">
                    <a href="#">${value.name}</a>
                    <div class="price">
                        <span>${'$' + value.price}</span>
                        <span> x 1</span>
                    </div>
                    </div>
                </div>
            `
            console.log(cart_html)
            $('.cart-content_lst').append(cart_html);
        })
    }
}
// renderCart();


var removeHandle = ()=>{
    $('.btn-remove').click(function(){
        cart = JSON.parse(localStorage.getItem('cart'))
        console.log(cart)
        let remove_index = $(this).attr('remove-index')
        console.log(remove_index)
        $(cart).each(function(index, value){
            console.log(value);
        })
    
        localStorage.setItem('cart', JSON.stringify(cart));
    
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart)
        $('.cart-content_lst').html('');
        $(cart).each(function(index, value){
            console.log(value, index)
            var cart_html = `
                <div class="cart-content_item d-flex pb-3">
                    <i class="fa-solid fa-xmark btn-remove" remove-index="${value.id}"></i>
                    <a class="img" href="#"><img src="${value.image}" width="70px" alt=""></a>
                    <div class="decribe">
                    <a href="#">${value.name}</a>
                    <div class="price">
                        <span>${'$' + value.price}</span>
                        <span> x 1</span>
                    </div>
                    </div>
                </div>
            `
            $('.cart-content_lst').append(cart_html);
        })
        $('.cart-quantity span')[0].innerText = cart.length;
    })
}

// Visted
$( window ).on('load' ,function() {
    var visited = localStorage.getItem('visited');
    if(visited == null){
        localStorage.setItem('visited', '1');
    }else{
        console.log(visited)
        localStorage.setItem('visited', ++visited);
        $('.visited .quantity')[0].innerText = visited;
    }
});


