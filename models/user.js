const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {type: String, required: "You must provide a first Name"},
    last_name: { type: String, required: "You must provide a last Name"},
    voice_type: { type: String, required: "You must designate a voice type"},
    city: {type: String, required: "You must provide a city"},
    state: {type: String, required: "You must provide a state"},
    school: {type: String, required: false},
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: "You must provide a password",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    video_recordings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    audio_recordings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Audio"
        }
    ]

});

const User = mongoose.model("User", userSchema);

module.exports = User;