
import { LeftCircleOutlined,RightCircleOutlined} from '@ant-design/icons';
import React,{useState } from 'react'
import { Carousel } from 'antd';
import '../public/style/components/advert.css'
import '../public/style/pages/comm.css'


const Advert = ()=>{
  const [ myImg , setMyImg ] = useState();
  
   return (
       <div className="ad-div">
         <div onClick={ ()=>{ myImg.next() }} className="imgBtn left">
              <LeftCircleOutlined />
         </div>
         <div onClick={ ()=>{ myImg.prev() } } className="imgBtn right">
              <RightCircleOutlined />
         </div>
          <Carousel 
            autoplay 
            dots={true}
            ref={dom => { setMyImg(dom); }}
            dotPosition={"bottom"}
            className="swipeBox"
          >
            <div >
              <a><img src={'http://www.luckyyounth.xyz/images/swipe01.jpg'} /></a>
            </div>
            <div>
              <a><img src={'http://www.luckyyounth.xyz/images/swipe02.jpg'} /></a>
            </div>
            <div>
              <a><img src={'http://www.luckyyounth.xyz/images/swipe03.jpg'} /></a>
            </div>
            <div>
              <a><img src={'http://www.luckyyounth.xyz/images/swipe04.jpg'} /></a>
            </div>
            <div>
              <a><img src={'http://www.luckyyounth.xyz/images/swipe05.jpg'} /></a>
            </div>
            <div>
              <a><img src={'http://www.luckyyounth.xyz/images/swipe06.jpg'} /></a>
            </div>
          </Carousel>
         
       </div>
   )
}


export default Advert