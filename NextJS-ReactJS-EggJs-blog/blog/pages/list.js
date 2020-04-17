
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb , Drawer} from 'antd'
import { FieldTimeOutlined, EyeOutlined, ZhihuOutlined ,UnorderedListOutlined} from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Comment from '../components/Comment'

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';


import '../public/style/pages/index.css'
const MyList = (list) => {

  const [mylist, setMylist] = useState(list.data.data)
  const [title, setTitle] = useState('首页')
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
      return hljs.highlightAuto(code).value;
    }
  });
  useEffect(() => {

    if (list.classify === '前端') {
      setTitle('前端')
    } else if (list.classify === '生活动态') {
      setTitle('生活动态')
    } else if(list.classify === '后端'){
      setTitle('后端')
    } else {
      setTitle('学习吧')
    }
    setMylist(list.data.data)
  })
  return (
    <>
      <Head>
        <title>博客列表</title>
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
                  <Breadcrumb.Item>{title}</Breadcrumb.Item>
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

MyList.getInitialProps = async (context) => {

  let id = context.query.id
  let classify = context.query.classify
 
  const promise = new Promise((resolve, reject) => {
    axios(servicePath.getListById + id).then(
      (res) => resolve({ data: res.data, id: id ,classify: classify})
    ).catch((err) => {
      console.log(err)
      let arry = {}
      reject(arry)
    })
  })
  return await promise
}

export default MyList