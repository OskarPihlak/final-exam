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
function nextSectionOfOrder(data){
    console.log('.'+data);
    document.querySelector('.'+data + '_tab').classList.remove('disabled');
}