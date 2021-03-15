import Order from './Orders.vue'
import PageContent from './PageContent.vue'
import Modify from './Modify.vue'

export default [
    {path: '/', component: PageContent},
    {path: '/orders', name: 'orders', component: Order},
    {path: '/modify', name: 'modify', component: Modify, props: true}
]