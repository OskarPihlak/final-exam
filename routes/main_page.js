const express = require('express');
const router = express.Router();

/*
* Main page routes
* */
const breadPictures = [{picture:'bigBurger.jpg', position:'left-align', tagline:'Healthy and tasty', slogan:'you can have that'},
                       {picture:'bread-pic.jpg', position:'left-align', tagline:'Feel the crust', slogan:''},
                       {picture:'food-on-street.jpg', position:'right-align', tagline:'Fresher than summer morning after rain', slogan:''}];
const contactInformation = [{icon:'contact_phone', content:' 775 987 941'},
                            {icon:'location_city', content:' Hybešova 291/45'},
                            {icon:'email', content:' obchod@breadwaystores.com'},
                            {icon:'access_time', content:' Esmaspäev – Reede 8.00 – 18.00'}];
const socialMediaIcons = ['fab fa-facebook','fab fa-twitter','fab fa-youtube','fab fa-instagram'];
router.get('/', (req, res) => {
  res.render('main_page', {
      breadPictures: breadPictures,
      contactInformation: contactInformation,
      socialMediaIcons:socialMediaIcons
  });
});

module.exports = router;
