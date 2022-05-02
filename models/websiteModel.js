const mongoose = require('mongoose');
constObjectId = mongoose.Schema.Types.ObjectId

const WebsiteSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
  
   
}, { timestamps: true });

module.exports = mongoose.model('Website', WebsiteSchema)