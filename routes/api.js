const express = require("express");
const usersRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Audio = require("../models/audioRecording");
const Video = require("../models/videoRecording");
const Role = require("../models/role");

//  User routes
usersRouter.post('/register', (req, res) => {
    const { first_name, last_name, voice_type, city, state, school, email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err) res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });

        if (user) {
            res.status(400).json({ message: { messageBody: "A user with this email address already exists.", messageError: true } });
        } else {
            const newUser = new User({ first_name, last_name, voice_type, city, state, school, email, password });
            newUser.save(err => {
                if (err) {
                    if (err) res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });
                } else {
                    res.status(201).json({ message: { messageBody: "Your account has been created successfully!", messageError: false } });
                }
            })
        }
    });
});

usersRouter.get('/profile=:id', (req, res) => {
    User.findById({ _id: req.params.id }).exec((err, document) => {
        if (err)
            return res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });
        res.status(200).json(document)
    });
});

usersRouter.get('/simplesearch=:search', (req, res) => {

    User.find({
        $or: [
            { "first_name": { $regex: RegExp(req.params.search, "i") } },
            { "last_name": { $regex: RegExp(req.params.search, "i") } },
            { "voice_type": { $regex: RegExp(req.params.search, "i") } },
            { "city": { $regex: RegExp(req.params.search, "i") } },
            { "state": { $regex: RegExp(req.params.search, "i") } }
        ]
    }).exec((err, document) => {
        if (err || document.length === 0) {
            return res.json({ message: { messageBody: "No results found!", messageError: true } })
        }
        res.status(200).json(document)
    });
});

usersRouter.get('/advancedsearch=:search', (req, res) => {

    let correctedParam = JSON.parse(req.params.search)

    Object.keys(correctedParam).forEach(key => correctedParam[key] = { $regex: RegExp(correctedParam[key], "i") })

    User.find(correctedParam).exec((err, document) => {
        if (err || document.length === 0) {
            return res.json({ message: { messageBody: "No results found!", messageError: true } })
        }
        res.status(200).json({response: document})
    })
})

// Role Routes
usersRouter.post('/roles', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = new Role(req.body);
    role.save((err) => {
        if (err)
            return res.status(500).json({ message: { messageBody: "Error has occured.", messageError: true } });
        req.user.roles.push(role);
        req.user.save((err) => {
            if (err)
                return res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });
            res.status(200).json({ message: { messageBody: "Role successfully added!", messageError: false } })
        })
    })
});

usersRouter.get('/roles', (req, res) => {
    User.findById({ _id: req.user._id }).populate("roles").exec((err, document) => {
        if (err)
            return res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });
        res.status(200).json({ roles: document.roles, authenticated: true })
    });
});

// Video Routes
usersRouter.post('/videos', passport.authenticate('jwt', { session: false }), (req, res) => {
    const video = new Video(req.body);
    video.save((err) => {
        if (err)
            return res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });
        req.user.videos_recordings.push(video);
        req.user.save((err) => {
            if (err)
                return res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });
            res.status(200).json({ message: { messageBody: "Video successfully added!", messageError: false } })
        })
    })
});

usersRouter.get('/videos', (req, res) => {
    User.findById({ _id: req.user._id }).populate("video_recordings").exec((err, document) => {
        if (err)
            return res.status(500).json({ message: { messageBody: "Error has occured", messageError: true } });
        res.status(200).json({ video_recordings: document.video_recordings, authenticated: true })
    });
});

// Authentication
// Authentication token
const signToken = (userID) => {
    return JWT.sign({
        iss: "crisperez",
        sub: userID
    }, "crisperez", { expiresIn: "2h" });
}

// Authenticate user sign in
usersRouter.post('/signin', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, first_name, last_name, voice_type, city, state, school, email, video_recordings, audio_recordings, roles, bio, headshot } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: req.user });
    }
});

// Authentication persistence
usersRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id, first_name, last_name } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { _id, first_name, last_name } })
})
// Destroy authentication token upon sign out
usersRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: null, success: true });
});

module.exports = usersRouter