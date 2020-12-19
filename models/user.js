const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    first_name: { type: String, required: "You must provide a first Name" },
    last_name: { type: String, required: "You must provide a last Name" },
    voice_type: {
        type: String,
        enum: ["soprano", "mezzo-soprano", "contralto", "countertenor", "tenor", "baritone", "bass-baritone", "bass"],
        required: "You must designate a voice type"
    },
    city: { type: String, required: "You must provide a city" },
    state: { type: String, required: "You must provide a state" },
    school: { type: String, required: false, default: null },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/]
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
    ],
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role"
        }

    ],
    bio: { type: String, default: null },
    headshot: { type: String, default: null }

});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);

        this.password = passwordHash;
        next();
    })
})

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)
        } else {
            if (!isMatch) {
                return cb(null, isMatch)
            }
            return cb(null, this)
        }
    })
}
const User = mongoose.model("User", userSchema);

module.exports = User;