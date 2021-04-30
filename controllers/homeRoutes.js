const router = require('express').Router();
const path = require('path');
const db = require("../models");


router.get('/exercise', (req, res) => {
    
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
})

module.exports = router;