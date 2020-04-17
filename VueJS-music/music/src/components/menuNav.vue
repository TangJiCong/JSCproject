<template>
  <div id="nav">
    <ul>
      <router-link tag="li" :to="{path:'/musicMain'}">
        <span class="iconfont icon-yinle"></span>
        音乐馆
      </router-link>
      <router-link tag="li" :to="{path:'/musicRecommend'}">
        <span class="iconfont icon-jinrituijian"></span>
        推荐
      </router-link>
      <router-link tag="li" :to="{path:'/musicDynamic'}">
        <span class="iconfont icon-dongtai"></span>
        动态
      </router-link>
      <router-link tag="li" :to="{path:'/musicMine'}">
        <span class="iconfont icon-wode"></span>
        我的
      </router-link>
    </ul>
  </div>
</template>

<script>
import "@/assets/font/iconfont.css";

export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
#nav {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-top: 1px solid #ccc;
  box-shadow: 1px -5px 5px #fff;
  background: #fff;
  z-index: 999;
}
#nav ul {
  display: flex;
}
#nav ul li {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
}
#nav ul li span {
  font-size: 30px;
}
.active {
  color: #31c27c;
}
</style>