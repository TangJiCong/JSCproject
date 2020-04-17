<template>
    <div id="info">
        <el-button type="primary" icon="el-icon-back" @click="back"></el-button>
        <div v-for="(item,index) in infoList" :key="index" class="infoBox">
            <div class="title">{{item.title}}</div>
            <div class="newsInfo">
                <div class="type">{{item.type}}</div>
                <div class="time">{{item.time}}</div>
            </div>
            <div class="content" v-html="item.content">
                <!-- {{item.content}} -->
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
    data(){
        return{
            infoList:[]
        }
    },
    mounted(){
        this.getNewsInfo()
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        getNewsInfo(){
            var that=this;
            var newsData=qs.stringify({
                newsId: this.$route.params.newsId
             });
            that.$axios.post("/findIdOneNews",newsData).then(function(res){
                //console.log(res)
                that.infoList=res.data.data
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
.infoBox{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
}
.title,.newsInfo{
    width: 100%;
    display: flex;
    justify-content: center;
    line-height: 30px;
}
.title{
    font-size: 26px;
    font-weight: bold;
}
.newsInfo{
    font-size: 12px;
}
.time{
    color: #ccc;
    text-indent: 2em;
}
</style>