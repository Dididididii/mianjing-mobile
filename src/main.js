import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Form,
  Field,
  Button,
  Toast,
  Cell,
  CellGroup,
  List,
  Icon,
} from "vant";
// 引入做全局组件
import ArticleCell from "@/components/ArticleCell.vue";
Vue.component("ArticleCell", ArticleCell);

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
