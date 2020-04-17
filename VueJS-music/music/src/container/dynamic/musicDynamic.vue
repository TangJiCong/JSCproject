<template>
  <div class="dynamic">
    <musicHeader/>
      
      <div class="dynamic_item" v-for="(item,index) in dynamicArry" :key="index">
        <div class="dynamic_user">
          <img :src="item.user.avatarUrl" width="50" @click="userdynamic(item.user.userId)">
          <p class="nickname">{{item.user.nickname}}</p>
        </div>
        <p class="dynamic_txt">{{item.json.msg}}</p>
        
      
      </div>
      <div class="space"></div>
      <menuNav></menuNav>
  </div>
</template>

<script>
import menuNav from '@/components/menuNav.vue'
import musicHeader from '@/components/musicFirst/musicHeader.vue'
export default {
  data(){
    return{
      dynamicUrl:this.HOST2+'/event',
      dynamicArry:[],
      videoUrl:[],
      loading:null
    }
  },
  methods:{
    getData(){
      this.$axios.get(this.dynamicUrl).then(res=>{
        //console.log(res)
        var eventData=res.data.event;
        for(var i in eventData){
            eventData[i].json=JSON.parse(eventData[i].json);
            this.dynamicArry.push(eventData[i]);
        }
        console.log(this.dynamicArry)
        this.loading.hide();
      }).catch(error=>{
        console.log(error);
      });
    },
    userdynamic(id){
      this.$router.push({name:'userDynamic',params:{uid:id}});
    }
  },
  mounted(){
     this.loading=this.$weui.loading("loading...");
    this.getData();
  },
  components:{
    menuNav,
    musicHeader
  }
}
</script>

<style scoped>
.dynamic{
  width: 100%;
  font-size: 12px;
  overflow: hidden;
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