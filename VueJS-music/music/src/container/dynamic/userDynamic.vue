<template>
  <div class="userdynamic">
      <div class="back" @click="back()">返回</div>
      
      <div class="dynamic_item" v-for="(item,index) in dynamicArry" :key="index">
        <div class="dynamic_user">
          <img :src="item.user.avatarUrl" width="50">
          <p class="nickname">{{item.user.nickname}}</p>
        </div>
        <p class="dynamic_txt">{{item.json.msg}}</p>
        
      
      </div>
  </div>
</template>

<script>

export default {
    data(){
    return{
      dynamicUrl:this.HOST2+'/user/event',
      dynamicArry:[],
      loading:null
    }
  },
  methods:{
    
    getData(){
        var uid=this.$route.params.uid||'32953014';
      this.$axios.get(this.dynamicUrl,{params:{uid:uid}}).then(res=>{
        //console.log(res)
       
       var eventData=res.data.events;
        for(var i in eventData){
            eventData[i].json=JSON.parse(eventData[i].json);
            this.dynamicArry.push(eventData[i]);
        }
        //console.log(this.dynamicArry)
        this.loading.hide();
      }).catch(error=>{
        console.log(error);
      });
    },
    back(){
        this.$router.go(-1);
    }
  },
  mounted(){
    this.loading=this.$weui.loading("loading...");
    this.getData();
  },
 
}
</script>

<style scoped>
.userdynamic{
    width: 100%;
    font-size: 12px;
    line-height: 25px;
}
.back{
    width: calc(100% - 20px);
    padding: 15px 10px;
    line-height: 25px;
    height: 25px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 1px 3px 3px #ccc;
}
.dynamic_item{
  padding: 10px 10px;
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;
}
.dynamic_user{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nickname{
  margin-left: 10px;
  font-weight: bold;
}
.dynamic_txt{
  width: 100%;
  white-space: wrap;
  
}
.space{
  height: 80px;
  width: 100%;
}
</style>