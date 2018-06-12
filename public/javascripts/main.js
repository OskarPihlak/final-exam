console.log('Costum Front-end code operational! Procceeding further executions commander...');
let i = 0;
function toggleOrderingMenu(){
    document.querySelector('.ordering').classList.toggle('hiddendiv');
}
function toggleLogin(){
    document.querySelector('.login-form').classList.toggle('hiddendiv');
}
function toggleSignUp(){
    document.querySelector('.signup-form').classList.toggle('hiddendiv');
}
function moreThings(){
    i++;
    console.log('Something more happened ' + i + ' times');
}
function nextSectionOfOrder(data, element) {
    console.log('.' + data);
    console.log(element);
    document.querySelector('.' + data + '_tab').classList.remove('disabled');
    document.querySelector('.' + element + '_a').setAttribute("style", "color:#009688 !important;'");
    document.querySelector(".btn-"+element).click(function() {
        $('ul.tabs').tabs('select_tab', data);
    });
}