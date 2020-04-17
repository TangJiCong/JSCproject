

import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;


function Comment(props){

    const [list,setList]=useState([])
    const getList = ()=>{
        axios({
                method:'get',
                url: servicePath.getCommentList,
                withCredentials: true,
                header:{ 'Access-Control-Allow-Origin':'*' }
            }).then(
            res=>{
                setList(res.data.list)  
                //console.log(res)
                }
            )
    } 
    useEffect(()=>{
        getList()
    },[])
    const delArticle = (id)=>{
        confirm({
            title: '确定要删除这条评论吗?',
            content: '如果你点击OK按钮，评论将会永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.delComment+id,{ withCredentials: true}).then(
                    res=>{ 
                        message.success('文章删除成功')
                        getList()
                        }
                    )
            },
            onCancel() {
                message.error('文章删除失败')
            },
         });
    
    }
    const updateArticle = (id,checked)=>{

        props.history.push('/index/add/'+id)
    
    }
    const toFormat = (date) => {
        let time=new Date(date)
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
    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={8} className="text-center">
                            <b>标题</b>
                        </Col>
                        <Col span={8} className="text-center">
                            <b>评论</b>
                        </Col>
                        <Col span={4} className="text-center">
                            <b>发布时间</b>
                        </Col>
                       
                        <Col span={4} className="text-center">
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8} className="text-center">
                                {item.title}
                            </Col>
                            <Col span={8} className="text-center">
                                {item.content}
                            </Col>
                            <Col span={4} className="text-center">
                                {toFormat(item.addTime)}
                            </Col>
                            

                            <Col span={4} className="text-center">
                              <Button type="primary" onClick={()=>{updateArticle(item.article_id)}}>详情</Button>&nbsp;

                              <Button onClick={()=>{delArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />

        </div>
    )

}

export default Comment