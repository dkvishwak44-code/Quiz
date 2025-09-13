const express = require('express');
const {addQuestion ,fetchCategory ,fetchQuestions }= require('../controller/questionController');
const router = express.Router();

router.post('/add-questions',addQuestion);
router.get('/category',fetchCategory);
router.get('/questions/:category',fetchQuestions);


module.exports = router;