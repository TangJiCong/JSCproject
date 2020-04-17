
import React,{useState } from 'react';
import { Layout, Menu, Breadcrumb,Avatar } from 'antd';


import {
  AppstoreOutlined,
  FileProtectOutlined,
  CommentOutlined
} from '@ant-design/icons';

import { Route,Redirect } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import AddType from './AddType'
import MyInfo from './MyInfo'
import Comment from './Comment'
import '../static/css/AdminIndex.css'

const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props){

    const [collapsed,setCollapsed] = useState(false)

    if(!(localStorage.getItem('openId'))){
      return(
        <Redirect to="/" ></Redirect>
      )
    }
    const onCollapse = collapsed => {
      setCollapsed(collapsed)
    };

    const toUserInfo = () =>{
      props.history.push('/index/MyInfo')
    }
    const toComment = () =>{
      props.history.push("/index/comment")
    }
    const handleClickArticle = e=>{
      //console.log(e.item.props)
      if(e.key==='addArticle'){
        props.history.push('/index/add')
      }else if(e.key==='articleList'){
        props.history.push('/index/list')
      }else{
        props.history.push('/index/addType')
      }

    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" >
            <a href="http://www.luckyyounth.xyz/index.html" target="_self" >
              <Avatar size={72}  src="http://www.luckyyounth.xyz/images/avator.jpg" />
            </a>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" onClick={toUserInfo}>
              <AppstoreOutlined />
              <span>个人信息</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              onClick={handleClickArticle}
              title={
                <span>
                  <FileProtectOutlined />
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
              <Menu.Item key="addType">类别列表</Menu.Item>
            </SubMenu>

            <Menu.Item key="2" onClick={toComment}>
              <CommentOutlined />
              <span>评论管理</span>
            </Menu.Item>
           
          </Menu>
        </Sider>
        <Layout>
          
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path="/index/" exact  component={AddArticle} />
                <Route path="/index/add/" exact   component={AddArticle} />
                <Route path="/index/add/:id"  exact   component={AddArticle} />
                <Route path="/index/list/"   component={ArticleList} />
                <Route path="/index/addType/" exact  component={AddType} />
                <Route path="/index/MyInfo/" exact  component={MyInfo} />
                <Route path="/index/comment/" exact  component={Comment} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>吉吉国王</Footer>
        </Layout>
      </Layout>
    )

}

export default AdminIndex