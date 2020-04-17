import React, { useState } from 'react'
import { BackTop } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import '../public/style/components/footer.css'
const Footer = ()=>{
    
    let timer = null
    const toTop = ()=>{
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn(){
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(oTop > 0){
            scrollTo(0,oTop-50);
                timer = requestAnimationFrame(fn);
            }else{
                cancelAnimationFrame(timer);
            } 
        })
    }
    return(
        <div className="footer_div">
            <BackTop visibilityHeight="400" onClick={toTop}>
                <div className="topBtn">
                   <ArrowUpOutlined />
                </div>
            </BackTop>
            <div>博客由 NextJS+React+Node+Ant Desgin驱动</div>
            <div className="record">湘ICP备20005604</div>
        </div>
    )
}

export default Footer