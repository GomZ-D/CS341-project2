const router = require('express').Router();

router.get('/', (req, res) => {
    //swagger.tags=['Hello World']
    res.send("Hello world");
})


router.use ('/', require('./swagger'));
router.use('/consoles', require('./computers'));

module.exports = router;