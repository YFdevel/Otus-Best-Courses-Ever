import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from "bcrypt";

const JWTStrategy = passportJWT.Strategy;
const LocalStrategy=passportLocal.Strategy;

// const userDb={
//     id:1,
//     email:"example@mail.ru",
//     password: 12345
// };

// passport.serializeUser(function(user, done){
//     console.log("Сериализация", user);
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done){
    // User.findById(id,function(err,user){
    //     done(err, user);
    // });
//     console.log("Десериализация", id);
//     const user=(userDb.id===id)?userDb:false;
//     done(null, user);
// });


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             if (!user.verifyPassword(password)) { return done(null, false); }
//             return done(null, user);
//         });
//     }
// ));



const { secret } = require('./keys');

const UserModel = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: username,
    passwordField: password,
}, async (username, password, done) => {
    try {
        const userDocument = await UserModel.findOne({username: username}).exec();
        const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);

        if (passwordsMatch) {
            return done(null, userDocument);
        } else {
            return done('Incorrect Username / Password');
        }
    } catch (error) {
        done(error);
    }
}));

passport.use(new JWTStrategy({
        jwtFromRequest: req => req.cookies.jwt,
        secretOrKey: secret,
    },
    (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
            return done('jwt expired');
        }

        return done(null, jwtPayload);
    }
));