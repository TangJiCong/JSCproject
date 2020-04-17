
import React, { useState, useEffect } from 'react';
import marked from 'marked'
import hljs from "highlight.js";
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import '../static/css/AddArticle.css'
import 'highlight.js/styles/monokai-sublime.css';
import { Row, Col, Input, Select, Button, DatePicker , message , notification} from 'antd'


const { Option } = Select;
const { TextArea } = Input



function AddArticle(props) {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    //const [updateDate,setUpdateDate] = useState() 
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别
    const [viewCount,setViewCount] = useState(0)
   
    useEffect(()=>{
        const getStart = async ()=>{
            getTypeInfo() // eslint-disable-next-line
       
            let tmpId = props.match.params.id // eslint-disable-next-line
            if(tmpId){
                setArticleId(tmpId)
                getArticleById(tmpId)
            } 
        }
        getStart()
    },[])

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    }); 

    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }
 
    const changeIntroduce = (e)=>{
         setIntroducemd(e.target.value)
         let html=marked(e.target.value)
         setIntroducehtml(html)
     }

    const getTypeInfo =()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(
        res=>{
            if(res.data.data==="没有登录"){
                localStorage.removeItem('openId')
                props.history.push('/')  
            }else{
                setTypeInfo(res.data.data)
            }

            }
        )
    }
    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{ 
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html=marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)
                setViewCount(res.data.data[0].view_count)
            }
        )
    }
    

    const selectTypeHandler =(value)=>{
        setSelectType(value)
    }

    const saveArticle = ()=>{
        if(!selectedType || selectedType==='请选择类型'){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }
        //message.success('检验通过')
        let datetext= showDate.replace('-','/') 
        //传递到接口的参数
        let viewNum = parseInt(viewCount)
        if( typeof viewNum !== 'number'){
            notification.warning({
                message: 'view_count 字段错误',
                description:
                  '必须为整型',
              })
            return
        }
        let dataProps={
            type_id : selectedType,
            title : articleTitle,
            article_content : articleContent,
            introduce : introducemd,
            addTime : (new Date(datetext).getTime())/1000,
            view_count : viewNum
        }   
        
        if(articleId==0){//eslint-disable-line
            
            
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isScuccess){
                        message.success('文章添加成功')
                    }else{
                        message.error('文章添加失败');
                    }

                }
            )
        }else{
            dataProps.id = articleId 
            axios({
                method:'post',
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{

                if(res.data.isScuccess){
                    message.success('文章修改成功')
                }else{
                    message.error('文章修改失败');
                }


                }
            )
        }
    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={[10,10]} >
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large" 
                                onChange={e=>{
                                    setArticleTitle(e.target.value)
                                }}
                            />
                        </Col>
                        <Col span={4}>
                            
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                   
                    <Row gutter={[10,10]} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent} 
                                className="markdown-content" 
                                rows={35}  
                                onChange={changeContent} 
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}}
                            >
                            </div>

                        </Col>
                    </Row>

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Row gutter={[5,10]}>
                                <Col span={12} style={{textAlign:"center"}}>
                                    <Button  size="large">暂存文章</Button>
                                </Col>
                                <Col span={12} style={{textAlign:"center"}}>
                                    <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                                </Col>
                            </Row>
                                
                            <Row gutter={[5,10]}>
                                <Col span={24}>
                                    <div className="date-select">
                                        <DatePicker
                                            placeholder="发布日期"
                                            size="large"
                                            onChange={(date,dateString)=>setShowDate(dateString)}
                                         />
                                    </div>
                                </Col>
                            </Row>

                            <Row gutter={[5,10]}>
                                <Col span={24}>
                                    <div className="date-select">
                                        阅读数
                                        <Input 
                                            value={viewCount}
                                            onChange={(e)=>{
                                               
                                                setViewCount(e.target.value)
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row gutter={[5,10]}>
                                <Col span={24}>
                                    <TextArea 
                                        rows={4} 
                                        value={introducemd}  
                                        onChange={changeIntroduce} 
                                        onPressEnter={changeIntroduce}
                                        placeholder="文章简介"
                                    />
                                </Col>
                            </Row>
        
                            <Row gutter={[5,10]}>
                                <Col span={24}>
                                    <div 
                                        className="introduce-html"
                                        dangerouslySetInnerHTML = {{__html:'文章简介：'+introducehtml}} 
                                    >
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}
export default AddArticle