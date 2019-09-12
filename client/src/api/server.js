import axios from 'axios'
import  qs from 'qs'

let instance =axios.create({
    retry: 2,
    timeout:15000,
    //'content-type': 'application/x-www-form-urlencoded;charset=UTF-8
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});

// 请求拦截
instance.interceptors.request.use(config=>{
    console.log('请求中...')
    const TOKEN = '1fd399bdd9774831baf555ae5979c66b';
    if(TOKEN){
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        config.headers['Authorization'] = TOKEN;
    }
    if(config.method==='post' || config.method==='get'){
        config.data=qs.stringify(config.data)
    }
     return config;
},error => {
    console.log('请求错误....');
    return Promise.reject(error)
})

//响应拦截
// error => {
//     console.log('服务器错误');
//     return Promise.reject(error)
// }
instance.interceptors.response.use(response=>{
  console.log('请求成功');
  // console.log(response)
  return response
},function axiosRetryInterceptor(res) {
    let config= res.config;
    if(!config){
        return Promise.reject(res)
    }
    config.retryCount= config.retryCount ||0;
    if(config.retryCount >= config.retry){
        return Promise.reject(res)
    }
    // 重新请求的次数自增
    config.retryCount +=1;
    let back=new Promise((resolve)=>{
        console.log(config.url+'请求超时，重新请求')
        setTimeout(()=>{
            resolve();
        },config.timeout ||1);
    });
    return back.then(()=>{
        return instance(config)
    })
})


// export  default  axios
class http {
    // 使用async ... await
    static async get(url) {
        // console.log(params)
        return await instance.get(url)
    }
    static async post(url, params) {
        console.log(params)
        return await instance.post(url, params);
    }
}


export default http;

