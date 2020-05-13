import Vue from 'vue'
import { Button, Form, FormItem, Input, Link, Container, Main, Header, Aside, Menu, MenuItem, Card,
Col, Row, Breadcrumb, BreadcrumbItem, Checkbox,CheckboxGroup,
Upload,
CollapseItem,
Collapse,
Message,
TableColumn,
Table,
Dialog,
MessageBox,
Tooltip,
Image,
Select,
Option
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Link)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Image)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm