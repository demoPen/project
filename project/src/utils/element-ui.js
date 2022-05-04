import Vue from 'vue';
import {
  Button,
  Input,
  FormItem,
  Form,
  Message,
  Radio,
  RadioGroup,
  Table,
  TableColumn,
  Dialog,
  Upload,
  MessageBox,
  Tooltip,
  Empty,
  Carousel,
  CarouselItem,
  Card,
  Row,
  Col,
  Collapse,
  CollapseItem
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn)
Vue.use(Form);
Vue.use(Dialog);
Vue.use(Upload)
Vue.use(Tooltip)
Vue.use(Empty)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Radio);
Vue.use(RadioGroup)
Vue.use( Collapse)
Vue.use(CollapseItem)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;