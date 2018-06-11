const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const Order = new Schema({
    userName: String,
    passWord: String,
    admin: Boolean,
    dateCreated: Date,
    orderHistory: Array,
});

