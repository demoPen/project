import Vue from "vue";
import VueRouter from "vue-router";


const Home = () => import("@/views/home.vue");
const Article = () => import("@/views/article.vue");
const Book = () => import("@/views/book.vue");
const Video = () => import("@/views/video.vue");
const Resource = () => import("@/views/resource.vue");
const NOTFOUND = () => import("@/views/NOT404.vue");
const MaintabBar = () =>import("@/components/common/MainTabBar/MainTabBar.vue");
//用户端
const Login = () => import("@/server/Login.vue");

const Server = () =>import ("@/server/Server.vue")
const Serverbook = () =>import ("@/server/book.vue")
const Serverarticle = () =>import ("@/server/article.vue")
const Servervideo = () =>import ("@/server/video.vue")
const Serverdownload = () =>import ("@/server/download.vue")
const BookDetail = () =>import("@/server/bookDetail.vue")
Vue.use(VueRouter);

const routes = [{
    path: "",
    // name: "client",
    component: MaintabBar,
    children: [{
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        component: Home,
      },
      {
        path: "book",
        component: Book,
      },
      {
        path: "article",
        component: Article,
      },
      {
        path: "video",
        component: Video,
      },
      {
        path: "resource",
        component: Resource,
      },
    ],
  },
  {
    path: "/admin",
    component: Login,
  },
  {
    path: "/server",
    component:Server,
    children:[
      {
        path:'',
        redirect: '/server/sbook'
      },
      {
        path:'sbook',
        component:Serverbook
      },
      {
        path:'sarticle',
        component:Serverarticle,
      },
      {
        path:'svideo',
        component:Servervideo
      },
      {
        path:'sdownload',
        component:Serverdownload
      },
      {
        path:'chapter/:id',
        component:BookDetail,
      },
      {
        path:'editBook',
        name:'writeBook',
        component:() =>import('@/server/editBookDetail.vue')
      }
    ]
  },
  {
    path:'watch',
    name:'watch',
    component:() => import('@/views/detail.vue')
  },
  {
    path:'*',
    component:NOTFOUND
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

  

export default router