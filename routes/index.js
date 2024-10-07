const router = require('express').Router();

router.get('/', (req, res) => {
    //swagger.tags=['Hello World']
    res.send("Consoles $ Computer APIs");
})


router.use ('/', require('./swagger'));
router.use('/consoles', require('./computers'));

module.exports = router;