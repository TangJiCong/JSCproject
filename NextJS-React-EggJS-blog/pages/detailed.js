
import React, { useState , useEffect} from 'react'
import Head from 'next/head'
import { 
    Row, 
    Col,
    Affix, 
    Breadcrumb , 
    Comment , 
    Input , 
    Avatar , 
    Button ,
    message , 
    List,
    Modal,
    notification,
    Drawer
} from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
import Navbar from '../components/Navbar'

import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
//import 'highlight.js/styles/atom-one-dark.css';
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'



import {
    FieldTimeOutlined,
    ZhihuOutlined,
    EyeOutlined,
    UnorderedListOutlined
} from '@ant-design/icons'
import '../public/style/pages/detailed.css'
const { TextArea } = Input
const Detailed = (props) => {
    const text = '本博主本不想开展博客功能,但为了搜集信息并改进，敷衍一下'
    const [content , setContent] = useState('')
    const [commentList , setCommentList] = useState([])
    const [visible , setVisible] = useState(false)
    const [visibleMenu , setVisibleMenu] = useState(false)

    useEffect (()=>{
        axios(servicePath.getComment + props.id).then(
            (res)=>{
                //console.log(res)
                setCommentList(res.data.data)
            }
        )
        .catch((err)=>{
            console.log(err)
            message.warning("数据出现异常")
        })

        let viewData = {
            id:props.id,
            view_count:props.view_count+1
        }
        axios({
            method:'post',
            url:servicePath.addViewNum,
            data:viewData
        }).then((addView) => {
            //console.log(addView)
            message.success("欢迎来到吉吉国王博客空间~")
        })
        .catch((error)=> {
            console.log(error)
            message.warning("数据出现异常")
        })
    },[])
    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer: renderer,
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

    let html = marked(props.article_content)

    const getTimeFormat = (times)=> {
        let time
        if(typeof times === 'undefined' || typeof times === 'null'){
            time = new Date()
        }else{
            time = new Date(times)
        }
        let tY=time.getFullYear()
        let tM=time.getMonth() + 1
        let tD=time.getDate()
        let tH=time.getHours()
        let tm=time.getMinutes()
        let tS=time.getSeconds()
        tM = tM>9 ? tM : '0' + tM
        tH = tH>9 ? tH : '0' + tH
        tD = tD>9 ? tD : '0' + tD
        tm = tm>9 ? tm : '0' + tm
        tS = tS>9 ? tS : '0' + tS
        let result = `${tY}-${tM}-${tD} ${tH}:${tm}:${tS}`
        return result
    }
    const handleComment = (e)=>{
        setContent(e.target.value)
    }
    const submitComment = ()=>{
        if(content===''){
            setVisible(true)
            return
        }
        let commentData={
            article_id:props.id,
            addTime: getTimeFormat(),
            content:content
        }
        axios({
            method:'post',
            url:servicePath.addComment,
            data:commentData
        }).then(
            res=>{
                if(res.data.isScuccess){
                    message.success('评论添加成功')
                }else{
                    message.error('评论添加失败');
                }
            }
        ).catch((err)=>{
            console.log(err)
            message.warning("评论出现异常")
        })
    }
    return (
        <>
            <Head>
                <title>博客详情</title>
            </Head>
            <div className="blogBox">
                <Header />

                <Drawer
                    title="欢迎来到吉吉国王的个人博客"
                    placement="left"
                    closable={false}
                    onClose={ ()=>{setVisibleMenu(false)} }
                    visible={visibleMenu}
                    >
                    <Navbar />
                </Drawer>

                <Modal
                    title="游客评论"
                    visible={visible}
                    onOk={()=> { 
                        setVisible(false)
                        notification.success({
                            message: '博客评论',
                            description: '谢谢你的配合，感谢~'
                        }) 
                    }}
                    onCancel={()=> { 
                        setVisible(false) 
                        notification.warning({
                            message: '博客评论',
                            description: '服务器小，性能不好，望体谅~'
                        }) 
                    }}
                    >
                    <p>评论不能为空！</p>
                    
                </Modal>
                <Row className="comm-main" type="flex" justify="center">
                    <Col className="comm-left" xs={0} sm={0} md={0} lg={4} xl={4}>
                        <Navbar />
                        <Affix offsetTop={50}>
                            <div className="detailed-nav comm-box">
                                <div className="nav-title">文章目录</div>
                                <div className="toc-list">
                                    {tocify && tocify.render()}
                                </div>

                            </div>
                        </Affix>
                    </Col>
                    <Col className="comm-middle" xs={22} sm={18} md={18} lg={14} xl={14}  >
                        <div>
                            <div className="bread-detail">
                                <Breadcrumb>
                                    <Breadcrumb.Item>
                                        <UnorderedListOutlined 
                                            className="menuBtn"
                                            onClick={() => {setVisibleMenu(true)}}
                                        />
                                        <a href="/">首页</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                                    <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>

                            <div className="detailBox">
                                <div className="detailed-title">
                                    {props.title}
                                </div>

                                <div className="list-icon list-centerIcon">
                                    <span className="list-iconBox">
                                        <FieldTimeOutlined /> 
                                        <strong className="list-iconText1">{props.addTime}</strong> 
                                    </span>
                                    <span className="list-iconBox">
                                        <ZhihuOutlined /> 
                                        <strong className="list-iconText2">{props.typeName}
                                    </strong>
                                    </span>
                                    <span className="list-iconBox">
                                        <EyeOutlined />
                                        <strong className="list-iconText3">{props.view_count}</strong> 
                                    </span>
                                </div>
                               
                                <div className="detailed-content"
                                    dangerouslySetInnerHTML={{ __html: html }}   >


                                </div>

                            </div>

                            <div className="commentBox">
                                <Comment
                                    avatar={
                                        <Avatar
                                        src="/static/img/touxiang.jpg"
                                        alt="游客"
                                        />
                                    }
                                    content={
                                        <div className="commentText">
                                            <TextArea 
                                                rows={4}
                                                placeholder={text}
                                                onChange={handleComment} 
                                                onPressEnter={submitComment}
                                            />
                                            <Button 
                                                onClick={submitComment} 
                                                type="primary"
                                                className="commentBtn"
                                            >评论</Button>
                                        </div> 
                                    }
                                />
                            </div>

                            <div>
                                <List
                                    itemLayout="vertical"
                                    dataSource={commentList}
                                    renderItem={item => (
                                    <List.Item>
                                        <Comment
                                            author={"游客"}
                                            avatar={
                                                <Avatar
                                                    src="/static/img/touxiang.jpg"
                                                    alt="游客"
                                                />
                                            }
                                            content={item.content}
                                            datetime={ getTimeFormat(item.addTime)}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col className="comm-right" xs={0} sm={0} md={0} lg={4} xl={4}>
                        <Author />
                        <Advert />
                    </Col>
                </Row>
                <Footer />
            </div>
            <Background />
        </>
    )

}

Detailed.getInitialProps = async (context) => {
    //console.log(context.query.id)
    let id = context.query.id
    const promise = new Promise((resolve, reject) => {

        axios(servicePath.getArticleById + id).then(
            (res) => {
                resolve(res.data.data[0])
            }
        ).catch((err) => {
            console.log(err)
            let arry = {}
            reject(arry)
        })
    })

    return await promise
}

export default Detailed