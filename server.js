const express = require ('express');
const mongodb = require ('./db/database');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv').config();


const port = process.env.PORT || 3000;


app
  .use(bodyParser.json())

//--Session and Auth.
   .use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())


//--Cross Origin--
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
     // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accesss-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })

  .use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATHC']}))
  .use(cors({origin: '*'}))
  .use('/', require('./routes'))

//passport - Github
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  // console.log(profile)
  return done(null, profile);
}
));

//passports functions

passport.serializeUser((user, done)=>{
   done(null, user);
});

passport.deserializeUser((user, done)=>{
  done(null, user);
});


 
//routes
app.get('/', (req,res)=> {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),  (req,res)=> {
    req.session.user = req.user;
    res.redirect('/');
  });

//CHECK FOR ANY ERROR 
process.on('uncaughtException', (err,origin)=> {
    console.log(process.stderr.fd, `Cought exception: ${err}\n` + `Exception origin: ${origin}`);
  } )

  mongodb.conectDB ((error)=>{
    if (error) {
        console.log(error);
    } else {
        app.listen(port, ()=> {
            console.log(`Server & Database is RUNNING on Port: ${port} `)
        })
    }
  })