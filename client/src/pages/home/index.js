import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './index.css'
import http from '../../api/server'
import api from '../../api/api'

class Home extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            studentList:[],
            // data:{},
            name:'',
            num:'',
            age:'',
            pwd:'',
            updatename:'',
            updatenum:'',
            updateage:'',
            updatepwd:'',
            updateShow:false,
            updateItem:{},
            updateID:''
        };
    }
    componentDidMount() {
       //  getData().then(res=>{
       //     // console.log(res.data)
       //      res= res.data
       //      if(res.status==0){
       //         let data= res.data
       //          console.log(data)
       //          this.setState({
       //              studentList:data
       //          })
       //      }
       // })
        this.getStudent();

    }
    getStudent=()=>{
     http.get(api.student)
         .then(res=>{
             // console.log(res)
             res= res.data
             if(res.status==0){
                 let data= res.data;
                 this.setState({
                     studentList:data
                 })
             }
         })
    }

    addStudent= () =>{
        // console.log('add');
        // console.log(api.addStudent,
        //     {stu_num :this.state.num , name: this.state.name, age:Number(this.state.age), pwd:this.state.pwd})
        http.post(api.addStudent,
            {stu_num :this.state.num , name: this.state.name, age:Number(this.state.age), pwd:this.state.pwd})
            .then(res=>{
                // console.log(res)
                res = res.data;
                if(res.status==200){
                    console.log(res.data)
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    // deleteItem=(item)=>{
    //     // console.log(item);
    //     if(item.id){
    //         axios.post('http://127.0.0.1:3000/student/deleteStudent',
    //             {id:item.id})
    //             .then(res=>{
    //                 res= res.data;
    //                 if(res.status ==0){
    //                     console.log(res.data)
    //                 }
    //
    //             })
    //     }
    //     // let arr = this.state.studentList;
    //     // arr.splice(index,1)
    //     // this.setState({
    //     //     studentList: arr
    //     // })
    // }
    deleteItem=(item)=>{
        console.log(item.id)
       if(item.id){
            console.log(api.deleteStudent,{id:item.id})
            http.post(api.deleteStudent,{id:item.id}).then(res=>{
                console.log(res)
            })
       }
    }
    // deleteStudent()
    updateItem=(item,index)=>{
       if(item){
           let data = Object.assign({},this.state.updateItem,item)
           // console.log(data)

           this.setState({
               updateShow:!this.state.updateShow,
               updateItem:data,
               updateID:item.id
           })
           // console.log(this.state.updateItem)
           // console.log(this.state.updateShow)
       }

        // console.log(this.state.updateItem)
    }
    updateList=()=>{
    console.log(this.state.updateID)
        let id=this.state.updateID
        console.log(api.updateStudent,
            {id:id,name:this.state.updatename,age:this.state.updateage})
        if(id){
        http.post(api.updateStudent,
            {id:id,age:this.state.updateage})
            .then(res=>{
                console.log(res)
                // if(res.stutas)
                if(res.status==200){
                    this.setState({
                        updateShow:false,
                    })
                }
            })
        }

    }
    inputName=(e)=>{
        // console.log(e.target.value);
        this.setState({
            name:e.target.value,
        })
    }
    inputNum=(e)=>{
        // console.log(e.target.value);
        this.setState({
            num:e.target.value
        })

    }
    inputAge=(e)=>{
        // console.log(e.target.value);
        this.setState({
            age:e.target.value
        })

    }
    inputPwd=(e)=>{
        // console.log(e.target.value);
        this.setState({
            pwd:e.target.value
        })

    }

    updateName=(e)=>{
        console.log(e.target.value);
        this.setState({
            updatename:e.target.value,
        })
    }
    updateNum=(e)=>{
        console.log(e.target.value);
        this.setState({
            updatenum:e.target.value
        })

    }
    updateAge=(e)=>{
        console.log(e.target.value);
        this.setState({
            updateage:e.target.value
        })

    }
    updatePwd=(e)=>{
        console.log(e.target.value);
        this.setState({
            updatepwd:e.target.value
        })

    }
    render() {
        const {studentList,name,num,age,pwd,updateShow,updateItem}=this.state;
        // console.log(updateItem)
        return (
            <div> home
                <div>
                    <label>名字</label> <input placeholder="请输入名字" type="text" onChange={(e) => this.inputName(e)} value={name}/>
                    <label>学号</label> <input placeholder="请输入学号" type="text" onChange={(e) => this.inputNum(e)} value={num}/>
                    <label>年龄</label> <input placeholder="请输入年龄" type="text" onChange={(e) => this.inputAge(e)} value={age}/>
                    <label>密码</label> <input placeholder="请输入密码" type="password" onChange={(e) => this.inputPwd(e)} value={pwd}/>
                    <button onClick={this.addStudent}>添加</button>
                </div>
            <ul>
                {studentList.map((item,index)=>
                    <li key={item.id}>{item.name}-{item.age}-{item.stu_num}-{item.pwd}
                    <button onClick={()=>this.deleteItem(item)}>删除</button>
                    <button onClick={()=>this.updateItem(item,index)}>修改</button>
                    </li>)}
            </ul>
                {updateShow&&<div className="update">
                    <label>名字</label> <input placeholder="" type="text" onChange={(e) => this.updateName(e)} defaultValue={updateItem.name}/><br/>
                    <label>学号</label> <input placeholder="" type="text" onChange={(e) => this.updateNum(e)} defaultValue={updateItem.stu_num}/><br/>
                    <label>年龄</label> <input placeholder="" type="text" onChange={(e) => this.updateAge(e)} defaultValue={updateItem.age}/><br/>
                    <label>密码</label> <input placeholder="" type="password" onChange={(e) => this.updatePwd(e)} defaultValue={updateItem.pwd}/><br/>
                    <button onClick={this.updateList}>确定修改</button>
                </div>}
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;