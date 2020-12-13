const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const audioSchema = new Schema({
    song_name: {
        type: String,
        required: "You must enter the song name."
    },
    song_composer: {
        type: String,
        required: "You must enter the composer of this piece."
    },
    audio_link: {
        type: URL,
        required: true
    }
});

const Audio = mongoose.model("Audio", audioSchema);
module.exports = Audio;