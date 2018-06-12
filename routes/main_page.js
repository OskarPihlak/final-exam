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
const orderingInformation = [{step:'Vali põhi',           id:'choose_base',   nextId:'choose_meat' ,  image:'1.jpg',
                              data:[{property:'Põhjad', price:0, style:'disabled'},
                                    {property:'Suur',price:4, style:''},
                                    {property:'Keskmine',price:3, style:''},
                                    {property:'Väike',price:2, style:''}]},
                            {step:'Vali liha',           id:'choose_meat',   nextId:'choose_cheese', image:'2.jpg',
                              data:[{property:'Liha', price:0, style:'disabled'},
                                    {property:'Kana',price:4, style:''},
                                    {property:'Sea',price:3, style:''},
                                    {property:'Veise',price:2, style:''}]},
                             {step:'Vali juust',          id:'choose_cheese', nextId:'choose_fresh',  image:'3.jpg',
                              data:[{property:'Juust', price:0, style:'disabled'},
                                    {property:'Mozarella',price:4, style:''},
                                    {property:'Sinihallitus juust',price:3, style:''},
                                    {property:'Tava juust',price:2, style:''}]},
                             {step:'Vali värske',         id:'choose_fresh',  nextId:'choose_sauce',  image:'4.jpg',
                              data:[{property:'Salat', price:0, style:'disabled'},
                                    {property:'Ceasari maik',price:4, style:''},
                                    {property:'Aia salat',price:3, style:''},
                                    {property:'Värskus purgis',price:2, style:''}]},
                             {step:'Vali kaste',          id:'choose_sauce',  nextId:'choose_place',  image:'5.jpg',
                              data:[{property:'Kastmed', price:0, style:'disabled'},
                                    {property:'Chipotle',price:4, style:''},
                                    {property:'Ketsup',price:3, style:''},
                                    {property:'Sinep',price:2, style:''}]},
                             {step:'Vali koht, kus süüa', id:'choose_place',  nextId:'choose_payment_method', image:'6-mby.jpg',
                              data:[{property:'Asukoht', price:0, style:'disabled'},
                                    {property:'Kohapeal',price:4, style:''},
                                    {property:'Kaasa',price:3, style:''}]},
                             {step:'Vali makseviis',      id:'choose_payment_method', nextId:'paymentConfirm',      image:'7.jpg',
                              data:[{property:'Makseviis', price:0, style:'disabled'},
                                    {property:'Kaardiga',price:4, style:''},
                                    {property:'Sulas',price:3, style:''}]}
                             ];
router.get('/', (req, res) => {
  res.render('main_page', {
      breadPictures: breadPictures,
      contactInformation: contactInformation,
      socialMediaIcons:socialMediaIcons,
      orderingInformation:orderingInformation
  });
});

module.exports = router;
