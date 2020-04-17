import React, { useState, useEffect } from 'react';
import '../static/css/MyInfo.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { Input,Button ,message, Row, Col} from 'antd';
const { TextArea } = Input


function MyInfo(props){
    const [infoId,setInfoId]=useState(1)
    const [name,setName]=useState()
    const [education,setEducation]=useState()
    const [workAge,setWorkAge]=useState()
    const [email,setEmail]=useState()
    const [phone,setPhone]=useState()
    const [blog,setBlog]=useState()
    const [github,setGithub]=useState()
    const [stubborn,setStubborn]=useState()
    const [commando,setCommando]=useState()
    const [introduction,setIntroduction]=useState()
    const [resume,setResume]=useState()
    const [echartData,setEchartData]=useState()

    useEffect(()=>{
        getList()
    },[])

    const getList = ()=>{
        axios({
                method:'get',
                url: servicePath.getUserInfo,
                withCredentials: true,
                header:{ 'Access-Control-Allow-Origin':'*' }
            }).then(
            res=>{
                let Data=res.data.data[0]
                setInfoId(Data.id)
                setName(Data.name)
                setEducation(Data.education)
                setWorkAge(Data.work_age)
                setEmail(Data.email)
                setPhone(Data.phone)
                setBlog(Data.blog)
                setGithub(Data.github)
                setStubborn(Data.stubborn)
                setCommando(Data.introduction)
                setIntroduction(Data.introduction)
                setResume(Data.resume)
                setEchartData(Data.echartData)
                //console.log(res.data.data)
                }
            )
        
    } 
    const updateInfo = () =>{
        let infoData={
            id:infoId,
            introduction:introduction,
            echartData:echartData,
            resume:resume,
            name:name,
            education:education,
            work_age:workAge,
            email:email,
            phone:phone,
            github:github,
            stubborn:stubborn,
            blog:blog,
            commando
        }
        axios({
            method:'post',
            url: servicePath.updateBlogInfo,
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' },
            data:infoData
        }).then(
        res=>{
                //console.log(res.data)
                if(res.data.isScuccess){
                    message.success('信息修改成功')
                }else{
                    message.error('信息修改失败')
                }
            }
        )
       
    }
    return (
        <div>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>姓名(name)</p>
                </Col>
                <Col span={16}>
                    <Input value={name} onChange={(e)=>{setName(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>学历(education)</p>
                </Col>
                <Col span={16}>
                    <Input value={education} onChange={(e)=>{setEducation(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>工作年限(work_age)</p>
                </Col>
                <Col span={16}>
                    <Input value={workAge} onChange={(e)=>{setWorkAge(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>邮箱(email)</p>
                </Col>
                <Col span={16}>
                    <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>联系方式(phone)</p>
                </Col>
                <Col span={16}>
                    <Input value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>博客(blog)</p>
                </Col>
                <Col span={16}>
                    <Input value={blog} onChange={(e)=>{setBlog(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>Github(github)</p>
                </Col>
                <Col span={16}>
                    <Input value={github} onChange={(e)=>{setGithub(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>倔金(stubborn)</p>
                </Col>
                <Col span={16}>
                    <Input value={stubborn} onChange={(e)=>{setStubborn(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>知乎(commando)</p>
                </Col>
                <Col span={16}>
                    <Input value={commando} onChange={(e)=>{setCommando(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>介绍(introduction)</p>
                </Col>
                <Col span={16}>
                    <TextArea rows={4} value={introduction} onChange={(e)=>{setIntroduction(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>概述(resume)</p>
                </Col>
                <Col span={16}>
                    <TextArea rows={4} value={resume} onChange={(e)=>{setResume(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p>图数据(echartData)</p>
                </Col>
                <Col span={16}>
                    <TextArea rows={8} value={echartData} onChange={(e)=>{setEchartData(e.target.value)}} />
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} className="text_right">
                    <p></p>
                </Col>
                <Col span={16}>
                    <Button type="primary" onClick={updateInfo}>修改</Button>
                </Col>
            </Row>
        </div>
    )
}

export default MyInfo