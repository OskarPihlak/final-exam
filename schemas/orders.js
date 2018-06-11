const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const Order = new Schema({
    id: ObjectId,
    orderedItems: Array,
    amountToPay: String,
    dateOrdered: Date,
    deliverAdress: String,
});