<template>
  <div class="header">
      <div class="header_logo">
          <img src="@/assets/img/logo.png">
      </div>
      <div class="header_search">
          <span class="iconfont icon-sousuo"></span>
          <input type="text" placeholder="请输入搜索内容" class="search_input">
      </div>
      <div class="header_icon">QQ</div>
  </div>
</template>

<script>
import "@/assets/font/iconfont.css";
export default {

}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.header{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 0;
    background-color: #fff;
    box-shadow: 1px 3px 3px #ccc;
}
.header_logo{
    width: 38%;
    text-align: center;
}
.header_logo img{
    width: 110px;
    height: 30px;
}
.header_search{
    border-radius: 32px;
    width: 50%;
    height: 30px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    padding-right: 15px;
    padding-left: 15px;
}
.search_input{
    appearance: none;
    display: block;
    width: 100%;
    height: 26px;
    border: none;
    padding-left: 15px;
    outline: none;
}
.header_icon{
    color: #31c27c;
    width: 12%;
    text-align: center;
}
</style>