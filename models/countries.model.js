const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    countryname :{
        type : String,
        required:true,
        trim :true,
        unique: true
    }
},{
    timestamps: true,
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;