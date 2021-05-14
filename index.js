require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyparser= require('body-parser');
const cookieparser = require('cookie-parser');
const route = require('./routes');
const app = express();
const sever = require('http').createServer(app);
const io = require('socket.io')(sever);
const db = require('./config/db');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const config = require('./config/authen/auth');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const middlewaresSocket = require('./middlewares/socket');
const middlewaresExphbs = require('./middlewares/exphbs');
const paypal = require('paypal-rest-sdk');
const dbUser = require('./controller/model/user');
const dbCourse = require('./controller/model/course');
const dbComment = require('./controller/model/commentCourse');
const user = require('./controller/model/user');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYhYuA9fTSd-Zc4WLSCzybMjnFc2ZDIMi8medLeRctArqRFWAJLb69mq5YG4FvtQmdAMUGeRWYxeX6zO',
    'client_secret': 'EATfTy3DQBnO7svfmOlPmvmLPqNC1jDTJexlCvvcSfPQ2hjLYdab9fAnwdk-Ds-E7rDhbRGrM9WnWfFV'
});
db.connect();
app.use(cookieparser('back-end-web-2020-vnua'));
app.use(express.static(path.join(__dirname, 'public')));

// Passport session setup. 
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Sử dụng FacebookStrategy cùng Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_key,
    clientSecret: config.facebook_secret,
    callbackURL: config.facebook_callback_url,
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}
));

// Sử dụng google cùng Passport.
passport.use(new GoogleStrategy({
    clientID: config.google_key,
    clientSecret: config.google_secret,
    callbackURL: config.gg_callback_url,
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}
));

app.engine('handlebars',exphbs({
    helpers: middlewaresExphbs.helpers
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'keyboard cat', key: 'sid' })); //Save user login
app.use(passport.initialize());
app.use(passport.session());
route(app);
let numberUserOnline = 0;
io.on('connection', middlewaresSocket.socket);
io.on('connection', (socket)=>{
    numberUserOnline++;
    io.sockets.emit('get-number-online', numberUserOnline);
    socket.on('disconnect', ()=>{
        numberUserOnline > 0 ? numberUserOnline-- : numberUserOnline = 0;
        io.sockets.emit('get-number-online', numberUserOnline);
    });

    socket.on('call-get-cmt', ()=> {
        dbComment.find({})
        .then((data)=>io.sockets.emit('get-data-cmt', data));
    });

    socket.on('add-cmt-to-array', (data)=> {
        dbCourse.findOne({_id: data[1]})
        .then(course => {
            if (course) {
                dbUser.findOne({_id: data[2]})
                .then(user=>{
                    if (user) {
                        const newComment = new dbComment({
                            idUser: data[2], 
                            idCourse: data[1], 
                            nameUser: user.fullName, 
                            contentComment: data[0],
                            lesson: data[3],
                        });
                        newComment.save()
                        .then(()=>{
                            dbComment.find({})
                            .then((data)=>io.sockets.emit('get-data-cmt', data));
                        })
                    }
                })
            }            
        })
    });

    socket.on('get-index-lesson', (index)=> {
        socket.emit('index-lesson', index)
    });

    socket.on('del-comment', (data)=> {
        dbComment.deleteOne({_id: data[0], idUser: data[1]})
        .then(()=>{
            dbComment.find({})
            .then((data)=>io.sockets.emit('get-data-cmt', data));
        })
    });

    socket.on('add-reply', (data)=>{
        dbUser.findOne({_id: data[2]})
        .then(user=>{
            if(user){
                dbComment.updateOne({_id: data[1]}, {$push: {reply: {
                    idUser: data[2],
                    nameUser: user.fullName,
                    date: Number(new Date),
                    contentComment: data[0]
                }}})
                .then(()=>{
                    dbComment.find({})
                    .then((data)=>io.sockets.emit('get-data-cmt', data));
                });
            }
        });
    });
});
const port = process.env.PORT || 8800;

sever.listen(port, () => console.log(`App listening at http://localhost:${port}`));