




import { Menu } from 'antd'
import { HomeOutlined, StarOutlined, FireOutlined, TrademarkOutlined, SettingOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { SubMenu } = Menu
const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            ).catch((err) => {
                console.log(err)
                return []
            })
            setNavArray(result)
        }
        fetchData()
    }, [])

    return (
        <div className="navbar">
            <Menu mode="inline" >
                <Menu.Item key="首页">
                    <Link href={{ pathname: '/index' }}>
                        <a><HomeOutlined />首页</a>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="前端"
                    title={
                        <span>
                            <StarOutlined />
                            <span>前端</span>
                        </span>
                    }
                >
                    {
                        navArray.map((item) => {
                            if (item.classify === '前端') {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Link href={{ pathname: '/list', query: { id: item.id, classify: item.classify } }}>
                                            <a>{item.typeName}</a>
                                        </Link>
                                    </Menu.Item>
                                )
                            } else {
                                return
                            }
                        })
                    }
                </SubMenu>
                <SubMenu
                    key="后端"
                    title={
                        <span>
                            <TrademarkOutlined />
                            <span>后端</span>
                        </span>
                    }
                >
                    {
                        navArray.map((item) => {
                            if (item.classify === '后端') {

                                return (
                                    <Menu.Item key={item.id}>
                                        <Link href={{ pathname: '/list', query: { id: item.id, classify: item.classify } }}>
                                            <a>{item.typeName}</a>
                                        </Link>
                                    </Menu.Item>
                                )
                            } else {
                                return
                            }
                        })
                    }
                </SubMenu>
                <SubMenu
                    key="生活动态"
                    title={
                        <span>
                            <FireOutlined />
                            <span>生活动态</span>
                        </span>
                    }
                >
                    {
                        navArray.map((item) => {
                            if (item.classify === '生活动态') {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Link href={{ pathname: '/list', query: { id: item.id, classify: item.classify } }}>
                                            <a>{item.typeName}</a>
                                        </Link>
                                    </Menu.Item>
                                )
                            } else {
                                return
                            }
                        })
                    }
                </SubMenu>
                <Menu.Item key="admin" >
                    <a href="http://www.luckyyounth.xyz/admin/index.html"><SettingOutlined />博客管理</a>
                </Menu.Item>
            </Menu>
        </div>
    )
}



export default Header