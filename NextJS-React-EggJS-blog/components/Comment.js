
import React ,{useState , useEffect} from "react"
import Link from 'next/link'
import { Tabs , List , message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { MessageOutlined , ReadOutlined } from '@ant-design/icons'
const { TabPane } = Tabs
import '../public/style/components/comment.css'

const Comment = (list) => {
    const [blogList , setBlogList] = useState([])
    const [commentList , setCommentList] = useState([])
    useEffect(()=> {
        getList()
        
    },[])
    
    const tabChange = () =>{
        
    }
    const getList = async () => {
        const promise = new Promise((resolve,reject) => {
            axios(servicePath.getNewsArticle).then(
                (res)=>{
                    //console.log(res.data.data)
                    axios(servicePath.getNewsComment).then(
                        (ress)=>{
                            setBlogList(res.data.data)
                            setCommentList(ress.data.data)
                            //console.log(ress.data.data)
                            let newsData = {
                                articleData:res.data.data,
                                commentData:ress.data.data
                            }
                            resolve(newsData)
                        }
                    ).catch((errs)=>{
                        console.log(errs)
                        message.warning("数据获取异常")
                        reject({})
                    })
                }
            ).catch((err)=>{
                console.log(err)
                message.warning("数据获取异常")
                reject({})
            })
        })
        return await promise
    }
    return (
        <div className="navbar commentBox">
            <Tabs 
                size="small"
                onChange={tabChange}>
                <TabPane
                    tab={
                        <span className="tabItem">
                            最新博客
                            
                        </span>
                    }
                    key="1"
                >
                    <List
                        itemLayout="vertical"
                        dataSource={blogList}
                        renderItem={item => (
                        <List.Item>
                            <p>
                                <ReadOutlined /> 
                                <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                    <a>{item.title}</a>
                                </Link>
                            </p>
                            
                        </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span className="tabItem">
                            最新留言
                            
                        </span>
                    }
                    key="2"
                >
                    <List
                        itemLayout="vertical"
                        dataSource={commentList}
                        renderItem={item => (
                        <List.Item>
                            <p>
                                <MessageOutlined /> 
                                <Link href={{ pathname: '/detailed', query: { id: item.article_id } }}>
                                    {item.content}
                                </Link>
                            </p>
                            
                        </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}



export default Comment