
import axios from 'axios'

const requests = axios.create({
  　//baseURL: 'http://192.168.1.6:2021',
    baseURL: 'http://49.235.78.245:2021',
  
    // 请求超时时间
    //timeout: 6000,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
})


export default requests