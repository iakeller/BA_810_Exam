var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating the database schema
var UserSchema = new Schema({
    property1: { type: String, required: true },
    property2: { type: Number, required: true }
});

module.exports = mongoose.model('exam', UserSchema);
