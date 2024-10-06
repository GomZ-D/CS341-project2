const express = require('express');
const router = require('express').Router();
const controller = require('../controllers/computers');

// router.get('/', (req,res)=>{
//     res.send('Hello Diego');
// });
router.get('/', (req, res) => {
    //swagger.tags=['Hello World']
    res.send("Hello world");
})

// --- ROUTES -- ENDPOINTS
router.get('/consoles', controller.getAll);
router.get('/consoles/:id', controller.getSingle);
router.post('/consoles',controller.createCons);
router.put('/consoles/:id', controller.updateCons);
router.delete('/console/:id', controller.deleteCons);



module.exports = router;