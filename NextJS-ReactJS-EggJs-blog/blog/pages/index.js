import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List ,Pagination ,message ,Drawer } from 'antd'
import { 
  FieldTimeOutlined, 
  ZhihuOutlined, 
  EyeOutlined , 
  UnorderedListOutlined
} from '@ant-design/icons'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Comment from '../components/Comment'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";



//import hljs from 'highlight.js/lib/highlight';
//import 'highlight.js/styles/monokai-sublime.css';
//import 'highlight.js/styles/github.css';
import 'highlight.js/styles/monokai-sublime.css';

import '../public/style/pages/index.css'

const Home = (list) => {
  const [mylist, setMylist] = useState(list.pageList.data);
  const [total,setTotal] =useState(list.pageCount)
  const [visibleMenu , setVisibleMenu] = useState(false)
  
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  const getPageList = (page, pageSize)=> {
    //console.log(page+"----"+pageSize)
    axios(servicePath.getPageList + page).then(
      (res)=>{
        setMylist(res.data)
      }
    ).catch((err)=>{
      message.error("数据获取异常")
      console.log(err)
    })
  }

  
  return (
    <>
      <Head>
          <title >吉吉国王个人博客</title>
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
              <List
                header={
                    <div className="listTitle">
                      <UnorderedListOutlined 
                          className="menuBtn"
                          onClick={() => {setVisibleMenu(true)}}
                      />
                      首页
                    </div>
                }
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
                      </span >
                    </div>
                    <div
                      className="list-context"
                      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                    >
                    </div>
                  </List.Item>
                )}
              />
            </div>
            <div className="pageBox">
                <Pagination 
                    total={total} 
                    defaultCurrent={1}
                    defaultPageSize={10} 
                    showQuickJumper 
                    showSizeChanger={false}
                    onChange={getPageList}
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

Home.getInitialProps = async () => {
  //查询全部列表
  // const promise = new Promise((resolve, reject) => {
  //   axios(servicePath.getArticleList).then(
  //     (res) => {
  //       resolve(res.data)
  //     }
  //   ).catch((err) => {
  //     console.log(err)
  //     let arry = {}
  //     reject(arry)
  //   })
  // })

  const promise = new Promise((resolve, reject) => {
    axios(servicePath.getPageCount).then(
      (pageCount)=>{
        const curPage = 1
        axios(servicePath.getPageList + curPage).then(
          (res)=>{
            let totalData = pageCount.data.data[0]["COUNT(*)"]
            let arry = {
              pageCount:totalData,
              pageList:res.data
            }
            resolve(arry)
          }
        ).catch((err)=>{
          console.log(err)
          message.error("数据获取异常")
          let arryErr = {}
          reject(arryErr)
        })
      }
    ).catch((error)=>{
      console.log(error)
      message.error("数据获取异常")
      let arryError = {}
      reject(arryError)
    })
  })
  return await promise
}

export default Home