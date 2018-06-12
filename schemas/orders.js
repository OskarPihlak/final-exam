const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    base: String,
    meat: String,
    cheese: String,
    fresh: String,
    sauce: String,
    paymentMethod: String,
    dateOrdered: Date,
});

let Order = module.exports = mongoose.model('Order', orderSchema);