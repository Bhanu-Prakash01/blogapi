
const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, res)=>{
    res.send("from Blog")
});


module.exports = router;