const express = require('express');
const router = require('express').Router();
const controller = require('../controllers/computers');

// router.get('/', (req,res)=>{
//     res.send('Hello Diego');
// });


// --- ROUTES -- ENDPOINTS
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/',controller.createCons);
router.put('/:id', controller.updateCons);
router.delete('/:id', controller.deleteCons);



module.exports = router;