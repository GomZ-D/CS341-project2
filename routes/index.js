const passport = require('passport');

const router = require('express').Router();

// router.get('/', (req, res) => {
//     //swagger.tags=['Hello World']
//     res.send("Consoles & Computer APIs");
// })

// router.get('/', (req,res)=>{
//     req.session.user = "GomZ";
//     res.send("Session is set");
// })

router.use ('/', require('./swagger'));
router.use('/consoles', require('./computers'));

//Login routes
router.get('/login', passport.authenticate('github'), (req,res)=>{
    // req.session.user = "GomZ";
    // res.send("Session is set");
});

router.get('/logout', function (req,res,next) {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    })  
})



module.exports = router;