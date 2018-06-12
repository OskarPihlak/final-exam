const express = require('express');
const router = express.Router();
const bodyParser =           require('body-parser');
const urlEncodedParser =     bodyParser.urlencoded({extended: false});
const moment = require('moment');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/users');


//Bring in Models
let Orders = require('../schemas/orders');

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
    Orders.find({}, (err, orders)=>{if(err){err} else {console.log(orders);}});
    console.log( res.locals);
  res.render('main_page', {
      breadPictures: breadPictures,
      contactInformation: contactInformation,
      socialMediaIcons:socialMediaIcons,
      orderingInformation:orderingInformation,
      user: req.user
  });
});

router.post('/post/order',urlEncodedParser ,(req,res)=>{
    let order = new Orders();
   order.base = req.body.base;
   order.meat = req.body.meat;
   order.cheese = req.body.cheese;
   order.fresh = req.body.fresh;
   order.sauce = req.body.sauce;
   order.paymentMethod = req.body.paymentMethod;
   order.dateOrdered = moment();

   order.save((err)=>{
       if(err){
           console.log(err);
           return;
       } else {
           res.redirect('/');
       }
   })
});
router.post('/register', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
       console.log(errors);
    }
    else {
        //checking for email and username are already taken
        User.findOne({ username: {
                "$regex": "^" + username + "\\b", "$options": "i"
            }}, function (err, user) {
            User.findOne({ email: {
                    "$regex": "^" + email + "\\b", "$options": "i"
                }}, function (err, mail) {
                if (user || mail) {
                    res.send({
                        user: user,
                        mail: mail
                    });
                }
                else {
                    const newUser = new User({
                        name: name,
                        email: email,
                        username: username,
                        password: password,
                        admin:false
                    });
                    User.createUser(newUser, function (err, user) {
                        if (err) throw err;
                        console.log(user);
                    });
                    res.redirect('/');
                }
            });
        });
    }
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/', failureFlash: false }),
    function (req, res) {
    console.log(res);
    console.log('You are logged in');
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
   console.log('You are logged out');
    res.redirect('/');
});
module.exports = router;
