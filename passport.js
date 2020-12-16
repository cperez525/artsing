const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/user");


const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// authorize user to ensure user can only edit correct information
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "crisperez"
}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        };


    })
}));

// authenticate user by email address and password
passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (err, user) => {

        // database issue
        if (err) return done(err);

        // no such user exists in database
        if (!user) return done(null, false);

        // user email matches, check if password matches
        user.comparePassword(password, done);
    });
}))
