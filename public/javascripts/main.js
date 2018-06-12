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
function nextSectionOfOrder(next, element) {
    console.log('.' + next);
    console.log(element);
    document.querySelector('.' + next + '_tab').classList.remove('disabled');
    document.querySelector('.' + element + '_a').setAttribute("style", "color:#009688 !important;'");
    document.querySelector(".btn-"+element).click(function() {
        $('ul.tabs').tabs('select_tab', next);
    });
}
function onOrderChange(selection) {
    console.log(selection[0].id);
    const values = document.querySelector(`#${selection[0].id} > div.card-content > div > div > input`).value;
   // console.log(values);
}
