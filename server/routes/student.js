/*
 * @Author: 寒嫣
 * @Date: 2019-08-28 16:45:32
 * @Description: file content
 */
const express = require('express');
const router = express.Router();
const studentDao = require('../models/studentDao')


//查询
router.get('/', (req, res) => {
    let querySql = 'select * from student;';
    studentDao.queryAllStudent(querySql, (result) => {
        res.send({
            status: 0,
            data: result

        })
    })
})

// 添加
router.post('/addStudent', (req, res, next) => {
    let addSql = 'insert into student (stu_num,name, age, pwd) values(?,?,?,?);';
    // console.log(addSql)
    let stu_num = req.body.stu_num;
    let name = req.body.name;
    let age = req.body.age;
    let pwd = req.body.pwd;
    studentDao.addStudentList(addSql, stu_num, name, age, pwd, (err, result, fields) => {
        // if (err == null) {
        //     res.json({
        //         result: result
        //     })
        // } else {
        //     console.log(err)
        // }
        if (err) {
            console.log(err)
        }
        res.json({
            result: result
        })
        // res.sendStatus(200);
    })

})

// 删除
router.post('/deleteStudent', (req, res, next) => {
    let deleteSql = 'delete from student where id=?;';
    let id = req.body.id;
    studentDao.deleteStudentList(deleteSql, id, (err, result, fields) => {
        if (err) {
            console.log(err)
        }
        res.sendStatus(200);
        // }  
    })

})


// 修改
router.post('/updateStudent', (req, res) => {
    // let updateSql = 'update student set age=? where name=?and id=?and stu_num=?and pwd=?;';
    let updateSql = 'update student set name=? where id=?;';
    console.log(updateSql)
    console.log(req.body)
    let name = req.body.name;
    let age = req.body.age;
    // let stu_num = req.body.stu_num;
    // let pwd = req.body.pwd;
    let id = req.body.id;
    studentDao.updateStudentList(updateSql, name, id, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err)
        }
        res.sendStatus(200);
    })
})
module.exports = router;