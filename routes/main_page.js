const express = require('express');
const router = express.Router();

/*
* Main page routes
* */
const breadPictures = [{picture:'bigBurger.jpg',      position:'left-align',  tagline:'Healthy and tasty', slogan:'you can have that'},
                       {picture:'bread-pic.jpg',      position:'left-align',  tagline:'Feel the crust', slogan:''},
                       {picture:'food-on-street.jpg', position:'right-align', tagline:'Fresher than summer morning after rain', slogan:''}];
const contactInformation = [{icon:'contact_phone',  content:' 775 987 941'},
                            {icon:'location_city',  content:' Hybešova 291/45'},
                            {icon:'email',          content:' obchod@breadwaystores.com'},
                            {icon:'access_time',    content:' Esmaspäev – Reede 8.00 – 18.00'}];
const socialMediaIcons = ['fab fa-facebook','fab fa-twitter','fab fa-youtube','fab fa-instagram'];
const orderingInformation = [{step:'Vali põhi',           id:'choose_base',   nextId:'choose_meat' ,  image:'1.jpg'},
                             {step:'Vali liha',           id:'choose_meat',   nextId:'choose_cheese', image:'2.jpg'},
                             {step:'Vali juust',          id:'choose_cheese', nextId:'choose_fresh',  image:'3.jpg'},
                             {step:'Vali värske',         id:'choose_fresh',  nextId:'choose_sauce',  image:'4.jpg'},
                             {step:'Vali kaste',          id:'choose_sauce',  nextId:'choose_place',  image:'5.jpg'},
                             {step:'Vali koht, kus süüa', id:'choose_place',  nextId:'choose_payment_method', image:'6.jpg'},
                             {step:'Vali makseviis',      id:'choose_payment_method', nextId:'',      image:'7.jpg'}];
router.get('/', (req, res) => {
  res.render('main_page', {
      breadPictures: breadPictures,
      contactInformation: contactInformation,
      socialMediaIcons:socialMediaIcons,
      orderingInformation:orderingInformation
  });
});

module.exports = router;
