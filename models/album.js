const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create album Schema model
const AlbumSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Name field is required']
    },

    price: {
        type: Number,
        required: [true, 'Price field is required']
    },

    artist: {
        type: String,
        required: [true, 'Artist field is required']
    },

    genre: {
        type: String,
        required: [true, 'Genre field is required']
    },

});

const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;