

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router,{ withRouter } from 'next/router'
import { Row, Col, List, Breadcrumb,message , Input , Drawer} from 'antd'
import { FieldTimeOutlined, EyeOutlined ,ZhihuOutlined , UnorderedListOutlined} from '@ant-design/icons'

import axios from 'axios'
import  servicePath  from '../config/apiUrl'

import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Comment from '../components/Comment'

import Link from 'next/link'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';


import '../public/style/pages/search.css'

const { Search } = Input
const Searcher = ({ router }) => {
 
  const [mylist, setMylist] = useState([])
  const [visibleMenu , setVisibleMenu] = useState(false)
  const renderer = new marked.Renderer();
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
      return hljs.highlightAuto(code).value
    }
  });
  
  useEffect(() => {
    
    if(router.query.data){
        let result= JSON.parse(router.query.data)
        setMylist(result)
        //console.log(result)
    }
  },[])
   

  const toSearch = (value) => {
        
    axios(servicePath.getLikeTile+value).then((res)=>{
        //console.log(res.data.data)
        let Data = res.data.data 
        if(Data && Data.length>=1){
          setMylist(Data)
          Test()
        }else{
            message.info("没有此标题")
        }
    })
    .catch((err)=>{
        console.log(err)
        message.error("搜索异常")
    })
  }
  return (
    <>
      <Head>
        <title>博客搜索列表</title>
      </Head>


      <div className="blogBox">
        <div className="header">
              <Row type="flex" justify="center">
                  <Col  xs={11} sm={9} md={9} lg={7} xl={7}>
                      <div className="headTextLeft">
                          <span className="header-logo">学习吧</span>
                          <span className="header-txt">一起来探究前端的奥秘</span>
                      </div>
                  </Col>

                  <Col className="memu-div" xs={11} sm={9} md={9} lg={7} xl={7} >
                      <div className="headTextRight">
                          <Search
                              placeholder="输入关键字查询"
                              onSearch={toSearch}
                              style={{ width: 200 }}
                          />
                      </div>
                  </Col>
              </Row>
        </div>

        <Drawer
          title="欢迎来到吉吉国王的个人博客"
          placement="left"
          closable={false}
          onClose={ ()=>{setVisibleMenu(false)} }
          visible={visibleMenu}
        >
          <Navbar />
        </Drawer>

        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={0} sm={0} md={0} lg={4} xl={4}>
            <Navbar />
            <Comment />
          </Col>
          <Col className="comm-middle" xs={22} sm={18} md={18} lg={14} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <UnorderedListOutlined 
                      className="menuBtn"
                      onClick={() => {setVisibleMenu(true)}}
                    />
                    <a href="/">首页</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>搜索列表</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span className="list-iconBox">
                        <FieldTimeOutlined /> 
                        <strong className="list-iconText1">{item.addTime}</strong> 
                      </span>
                      <span className="list-iconBox">
                        <ZhihuOutlined /> 
                        <strong className="list-iconText2">{item.typeName}</strong>
                      </span>
                      <span className="list-iconBox">
                        <EyeOutlined /> 
                        <strong className="list-iconText3">{item.view_count}</strong> 
                      </span>
                    </div>
                    <div className="list-context"
                      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                    >
                    </div>
                  </List.Item>
                )}
              />
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

export default withRouter(Searcher)