/*
 * @Author: 寒嫣
 * @Date: 2019-08-28 15:40:29
 * @Description: file content
 */
const dbutil = require('./dbutil');
const connection = dbutil.createConnection();
connection.connect();

//查询所有数据
function queryAllStudent(querySql, success) {
    // const querySql= 'select * from student;';
    connection.query(querySql, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            // throw new Error(error)
            console.log(error)
        }
    })
}
queryAllStudent(success => {
    // console.log(success)
})

// 添加
function addStudentList(addSql, stu_num, name, age, pwd, success) {
    // const addSql = 'insert into student(stu_num, name, age, pwd) values(?,?,?,?);';
    const params = [stu_num, name, age, pwd];
    connection.query(addSql, params, function (error, result) {

        if (error == null) {
            success(result)
        } else {
            // throw new Error(error)
            console.log(error)
        }
    })

}

// 修改
function updateStudentList(updateSql, name, id, success) {
    const params = [name, id];
    console.log(params);
    connection.query(updateSql, params, function (error, result) {
        console.log(error);
        // console.log(result);
        if (error == null) {
            success(result)
        } else {
            console.log(error)
            // throw new Error(error)
        }
    })
}

//删除
function deleteStudentList(deleteSql, id, success) {
    connection.query(deleteSql, id, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            // throw new Error(error)
            console.log(error)
        }
    })
}
// function getItem(queryItem, id, success) {
//     const queryItem = 'select * from student where id=?;';
//     connection.query(queryItem, id, function (error, result) {
//         if (error == null) {
//             success(result)
//         } else {
//             throw new Error(error)
//         }
//     })
// }
// getItem(2, (success) => {
//     console.log(success)
// })
module.exports = {
    'queryAllStudent': queryAllStudent,
    'addStudentList': addStudentList,
    'updateStudentList': updateStudentList,
    'deleteStudentList': deleteStudentList
    // 'getItem': getItem
}