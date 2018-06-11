const express = require('express');
const router = express.Router();

/*
* Main page routes
* */
const breadPictures = [{picture:'bigBurger.jpg', position:'left-align'},
                       {picture:'bread-pic.jpg', position:'right-align'},
                       {picture:'food-on-street.jpg', position:'right-align'}];
router.get('/', (req, res) => {
  res.render('main_page', { breadPictures: breadPictures });
});

module.exports = router;
