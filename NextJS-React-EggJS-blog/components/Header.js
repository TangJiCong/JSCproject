

import '../public/style/components/header.css'
import { Row, Col, Input, message } from 'antd'

import React, { useState} from 'react'
import Router from 'next/router'

import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Search } = Input
const Header = () => {
   
    

    const toSearch = (value) => {

        axios(servicePath.getLikeTile + value).then((res) => {
            //console.log(res.data.data)
            let Data = res.data.data
            if (Data && Data.length >= 1) {
                if(Data.length>=21){
                    for(var i=Data.length-1;i< 21;i--){
                        Data.splice(i,1)
                    }
                }

                let result = JSON.stringify(Data)
                Router.push({
                    pathname: '/search',
                    query: {
                        data: result
                    }
                }, '/search')
            } else {
                message.info("没有此标题")
            }
        })
            .catch((err) => {
                console.log(err)
                message.error('搜索异常')
            })
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={11} sm={9} md={9} lg={7} xl={7}>
                    <div className="headTextLeft">
                        <span className="header-logo">学习吧</span>
                        <span className="header-txt">一起来探究前端的奥秘</span>
                    </div>

                </Col>

                <Col className="memu-div" xs={11} sm={9} md={9} lg={7} xl={7}>
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
    )
}



export default Header