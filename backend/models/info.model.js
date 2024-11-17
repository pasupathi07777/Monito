const mongoose = require('mongoose');

const informationInfoSchema = new mongoose.Schema({
    question: { type: String, required: true },  
    answer: { type: String, required: true },    
    images: [{ type: String }],                  
}, {
    timestamps: true,
});

const informationInfoModel = mongoose.model('InformationInfo', informationInfoSchema);
module.exports = informationInfoModel;
