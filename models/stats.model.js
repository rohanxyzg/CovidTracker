const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statsSchema = new Schema({
    countryname : { type: String, required: true },
    confirmed: { type: Number, required: true },
    recovered: { type: Number, required: true },
    deaths : { type: Number, required: true },
},{
    timestamps: true,
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;