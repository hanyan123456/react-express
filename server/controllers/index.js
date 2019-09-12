/*
 * @Author: 寒嫣
 * @Date: 2019-08-28 17:20:11
 * @Description: file content
 * 
 */
const express = require('express');
const router = express.Router();


var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
let studentRouter = require('../routes/student')

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/student', studentRouter);

module.exports = router;