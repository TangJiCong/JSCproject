<template>
  <div class="ranking">
    <div class="singer_top">
      <div class="top_left">
        <span class="grow_son left_10px" @click="toback">返回</span>
      </div>
      <div class="grow_son font_w">QQ音乐排行榜</div>
      <div class="top_right">
        <span class="grow_son iconfont icon-sousuo right_10px"></span>
      </div>
    </div>
    <rankRecom/>
    <rankingToper/>
    <regional/>
    <featured/>
  </div>
</template>

<script>
import rankRecom from '@/components/musicFirst/ranking/rankingRecommend.vue'
import rankingToper from '@/components/musicFirst/ranking/rankingToper.vue'
import regional from '@/components/musicFirst/ranking/regional.vue'
import featured from '@/components/musicFirst/ranking/featured.vue'
export default {
  methods: {
    toback() {
      this.$router.push({ path: "/" });
    }
  },
  components:{
      rankRecom,
      rankingToper,
      regional,
      featured
  }
};
</script>

<style scoped>
.ranking {
  width: 100%;
  background-color: #fafafa;
}
.singer_top{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15px 0;
    background-color: #fff;
    align-items: center;
    box-shadow: 1px 2px 3px #ccc;
}
.top_left,.top_right{
    width: 30%;
}
.top_left{
    text-align: left;
    text-indent: 10px;
    font-size: 16px;
    font-weight: normal;
}
.top_right{
    text-align: right;
}
.right_10px{
    margin-right: 10px;
    font-size: 26px;
}
.grow_son{
    width: 40%;
    text-align: center;
}
.font_w{
    font-size: 20px;
    font-weight: bold;
}
</style>