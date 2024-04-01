'use strict';
var myCurrenLang = 'en';
var myLangsContent;

window.onload = function () {
    lax.init()
    lax.addDriver(
        "scrollY",
        function () {
            return document.documentElement.scrollTop;
        },
        {frameStep: 1}
    );
    lax.addElements("#sec-video-content-animation", {
        scrollY: {
            translateX: [["elInY", "elOutY0"], [0, "-500"]],
        }
    });
    lax.addElements("#sec-text-content-animation", {
        scrollY: {
            rotate: [["elInY", "elOutY100"], ["0", "180"]],
        }
    });

}
$('#slick-slider-1').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<button class="slider-1-next"></button>',
    prevArrow: '<button class="slider-1-prev"></button>',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});
function ShowLangPanel(){
    document.getElementById('lang-switch-btn').classList.add('show-lang-panel');
}
function  HideLangPanel(){
    document.getElementById('lang-switch-btn').classList.remove('show-lang-panel');
}
function ChangLang(str){
    event.preventDefault();
    document.getElementById('lang-switch-btn').innerHTML = str;
    document.getElementById('lang-switch-btn').classList.remove('show-lang-panel');
    document.getElementsByClassName('active-lang')[0].classList.remove('active-lang');
    document.getElementById('lang-btn-' + str).classList.add('active-lang')
    myCurrenLang = str;
    InsertContent();
}
function InsertContent(str){
    var myCollection = document.getElementsByClassName('multilang');
    var myStr;
    for(var i=0; i<myCollection.length; i++){
        myStr = myCollection[i].getAttribute('data-lang-key');
        myCollection[i].innerHTML = myLangsContent[myCurrenLang][myStr];
    }
}
function ShowHideMobileMenu(){
    document.getElementById('mobile-menu').classList.toggle('show-mobile-menu');
    document.getElementById('dad-mobile-btn').classList.toggle('mobile-btn-view-2');
}
$(document).ready(function(){
    $("#main-menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
    $("#mobile-menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
        ShowHideMobileMenu();
    });
    LoadLangsContent();
});
$('#main-form-submit').click(function(){
    let myButton = $(this);
    var myCollection = document.querySelectorAll('#main-form input');
    for(var i=0; i<myCollection.length; i++){
        if(myCollection[i].value==''){
            alert('Error! All input fields must be filled!');
            return false;
        }
    }
    var myStr ='../save_data.php';
    $.ajax({
        url: myStr,
        type: "POST",
        dataType: "json",
        data: $("#main-form").serialize(),
        beforeSend: function (){
            myButton.attr('disabled', true);
        },
        success: function (json) {
            alert(json.result);
            document.getElementById('main-form').reset();
        },
        error: function () {
            alert('Send error, try again later');
        },
        complete: function (){
            myButton.removeAttr('disabled');
        }
    });
});
function LoadLangsContent(){
    $.getJSON('../langs.json', function(result) {
        myLangsContent = result;
    });
}