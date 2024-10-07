const express = require('express');
const router = require('express').Router();
const controller = require('../controllers/computers');
const validation = require('../middleware/validate');

// router.get('/', (req,res)=>{
//     res.send('Hello Diego');
// });


// --- ROUTES -- ENDPOINTS
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/',validation.saveContact, controller.createCons);
router.put('/:id',validation.saveContact, controller.updateCons);
router.delete('/:id', controller.deleteCons);



module.exports = router;