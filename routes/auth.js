

const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, res)=>{
    res.send("from Auth")
});


module.exports = router;
