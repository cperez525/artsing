const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    song_name: {
        type: String,
        required: "You must enter the song name."
    },
    song_composer: {
        type: String,
        required: "You must enter the composer of this piece."
    },
    video_link: {
        type: URL,
        required: "Please provide the youtube embedded link"
    }
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;