/*
 * @Author: 寒嫣
 * @Date: 2019-08-28 15:05:24
 * @Description: file content
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;