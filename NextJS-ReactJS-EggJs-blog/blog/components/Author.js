
import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import {Avatar,Divider, Tooltip,Progress,Table} from 'antd'




import { GithubOutlined, QqOutlined, WeiboOutlined ,HeartTwoTone ,SmileTwoTone} from '@ant-design/icons'

const { Column } = Table;
const Author =()=>{
    const [navArray , setNavArray] = useState([])
    const [github , setGithub] = useState("博主很懒~")
    const [email , setEmail] = useState("博主很懒~")
    const [stubborn , setStubborn] = useState("博主很懒~")
    const [introduction , setIntroduction] = useState("笑谈开发轶事，品味程序人生")
    const [name , setName] = useState("小鲜肉")
    const [education , setEducation] = useState("本科")
    const [workAge , setWorkAge] = useState(3)
    const [phone , setPhone] = useState("88888888888")
    const [blog , setBlog] = useState("rabbit")
    useEffect(()=>{
        const fetchData = async ()=>{
           const result= await axios(servicePath.getUserInfo).then(
                (res)=>{
                    let Data=res.data.data[0]
                    let aa=Data.echartData.split(/[\n]/)
                    for(var i in aa){
                        aa[i]=JSON.parse(aa[i])
                        aa[i].fromColor=randomColor()
                        aa[i].toColor=randomColor()
                    }
                    setGithub(Data.github)
                    setEmail(Data.email)
                    setStubborn(Data.stubborn)
                    setIntroduction(Data.introduction)
                    setName(Data.name)
                    setEducation(Data.education)
                    setWorkAge(Data.work_age)
                    setPhone(Data.phone)
                    setBlog(Data.blog)
                    
                    return aa
                }
            ).catch((err)=>{
                console.log(err)
                let defaultArry=[
                    {value: 75, name: "jquery"},
                    {value: 70, name: "node.js"},
                    {value: 60, name: "vue.js"},
                    {value: 50, name: "react.js"},
                    {value: 80, name: "mongodb"},
                    {value: 59, name: "mysql"},
                    {value: 55, name: "nginx"},
                    {value: 61, name: "egg.js"},
                    {value: 56, name: "微信小程序"},
                    {value: 58, name: "next.js"},
                    {value: 51, name: "nuxt.js"}
                ]
                return defaultArry
            })
           setNavArray(result)
        }
        fetchData()
    },[])

    const randomColor = ()=> {
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        var rgb = 'rgb' +'('+r+','+g+','+b+')';
        return rgb;
    }
    const data = [
        {
            key: '666666',
            userInfoKey: '姓  名',
            userInfoValue: name,
        },
        {
            key: '55555',
            userInfoKey: '学  历',
            userInfoValue: education,
        },
        {
            key: '88888888',
            userInfoKey: '工作经验',
            userInfoValue: workAge,
        },
        {
            key: '999999999',
            userInfoKey: '联系方式',
            userInfoValue: phone,
        },
        {
            key: '1111111111',
            userInfoKey: 'CSDN',
            userInfoValue: blog,
        }
      
      ];
     
    return (
        <div>
            <div className="author-div">

                <div> 
                    <Tooltip 
                        placement="left"
                        title={ () => {
                            return (
                                <div>
                                    <Table  
                                        dataSource={data} 
                                        showHeader={false}
                                        pagination={false}
                                    >
                                        <Column 
                                            title={<HeartTwoTone twoToneColor="#eb2f96" />} 
                                            dataIndex="userInfoKey" 
                                            key="userInfoKey" 
                                        />
                                        <Column 
                                            title={<SmileTwoTone twoToneColor="#52c41a" />} 
                                            dataIndex="userInfoValue" 
                                            key="userInfoValue" 
                                        />
                                    </Table>
                                </div>
                            )
                        }} 
                    >
                        <a 
                            className="myIcon"
                            href="http://www.luckyyounth.xyz/admin/index.html"
                        >
                            <Avatar size={100} src={'http://www.luckyyounth.xyz//images/avator.jpg'}  />
                        </a>
                    </Tooltip>
                </div>
                <div className="author-introduction">
                    <p>{introduction}</p>
                    
                    <Divider>个人社交</Divider>
                    <Tooltip title={github} >
                        <a 
                            href={github}
                            className="myIcon"
                        >
                            <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                        </a>
                    </Tooltip>
                    <Tooltip title={email} >
                        <a 
                            href={github}
                            className="myIcon"
                        >
                            <Avatar size={28} icon={<QqOutlined />}  className="account" />
                        </a>
                    </Tooltip>
                    <Tooltip title={stubborn} >
                        <a 
                            href={github}
                            className="myIcon"
                        >
                            <Avatar size={28} icon={<WeiboOutlined />}  className="account"  />
                        </a>
                    </Tooltip>
                    
                    <div className="author-userInfo">
                        
                    </div>
                </div>
            </div>
            <div className="author-progressBox author-height">
                <Divider className="author-skill">博主技能</Divider>
                {
                    navArray.map( (item , index)=> {
                        return (
                            <div className="author-progressRow" key={index} >
                                <p className="author-progressTile">{item.name}</p>
                                <div className="author-progress">
                                    <Progress 
                                        strokeLinecap="square" 
                                        percent={item.value} 
                                        status="active" 
                                        strokeColor={{
                                            from: item.fromColor,
                                            to: item.toColor,
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
           
        </div>
        
    )

}

export default Author