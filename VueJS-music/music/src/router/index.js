import Vue from "vue";
import VueRouter from "vue-router";


import musicMain from "@/container/music/musicMain";
import musicDynamic from "@/container/dynamic/musicDynamic";
import userDynamic from "@/container/dynamic/userDynamic";
import musicRecommend from "@/container/recommend/musicRecommend";
import musicMine from "@/container/mine/musicMine";
import singerList from "@/components/musicFirst/singer/singerList.vue";
import singerLeft from "@/components/musicFirst/singer/singerLeft.vue";
import singerRight from "@/components/musicFirst/singer/singerRight.vue";
import singerConcern from "@/components/musicFirst/singer/singerConcern.vue";
import singerOften from "@/components/musicFirst/singer/singerOften.vue";
import rankingList from "@/components/musicFirst/ranking/rankingList.vue";
import classifyList from "@/components/musicFirst/classify/classifyList.vue";
import transceiverList from "@/components/musicFirst/transceiver/transceiverList.vue";
import total from "@/components/musicFirst/transceiver/total.vue";
import news from "@/components/musicFirst/transceiver/news.vue";
import mvDetail from "@/components/musicFirst/transceiver/mvDetail.vue";
import toOfficialDetail from "@/components/musicFirst/songDetail/toOfficialDetail.vue";
import officialDetailItem from "@/components/musicFirst/songDetail/officialDetailItem.vue";
import singerDetail from "@/components/musicFirst/songDetail/singerDetail.vue";
import album from "@/components/musicFirst/songDetail/album.vue";
import login from "@/container/login.vue";


Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/musicMain'
  },
  {
    path: "/musicMain",
    name: "musicMain",
    component: musicMain,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "/musicRecommend",
    name: "musicRecommend",
    component: musicRecommend,
  },
  {
    path: "/musicDynamic",
    name: "musicDynamic",
    component: musicDynamic,
  },
  {
    path: "/userDynamic",
    name: "userDynamic",
    component :userDynamic
  },
  {
    path: "/musicMine",
    name: "musicMine",
    component: musicMine,
  },
  {
    path: "/singerList",
    name: "singerList",
    redirect: '/singerList/singer',
    component: singerList,
    children: [{
        path: 'singer',
        component: singerLeft
      },
      {
        path: 'mine',
        component: singerRight,
        redirect: '/singerList/mine/concern',
        children: [{
            path: 'concern',
            component: singerConcern
          },
          {
            path: 'often',
            component: singerOften
          }
        ]
      }
    ]
  },
  {
    path: '/songRanking',
    name: 'songRanking',
    component: rankingList,
  },
  {
    path: '/classify',
    name: 'classify',
    component: classifyList,
  },
  {
    path: '/transceiver',
    name: 'transceiver',
    redirect: '/transceiver/total',
    component: transceiverList,
    children: [{
      path: 'total',
      component: total
    },
    {
      path: 'news',
      component: news
    }
  ]
  },
  {
    path :'/mvDetails/:mvid',
    component:mvDetail
  },
  {
    path :'/toOfficialDetail/:songid',
    component:toOfficialDetail
  },
  {
    //path :'/officialDetailItem/:songId',
    path :'/officialDetailItem',
    name:'officialDetailItem',
    component:officialDetailItem
  },
  {
    path :'/singerDetail/:singerId',
    component:singerDetail
  },
  {
    path :'/album',
    name:'album',
    component:album
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
];


const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
  } else {
    if (JSON.parse(localStorage.getItem('userInfo'))) {
      next()
    } else {
      next({
        path: "/login"
      })
    }
  }
});
export default router;