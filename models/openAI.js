const mongoose = require('mongoose')
const Schema = mongoose.Schema

const openAISchema = new Schema({
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
})


module.exports = mongoose.model('OpenAIModel', openAISchema)