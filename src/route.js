import Home from './component/Home.vue'
import Quize from './component/Quize.vue'
import QuizeAnswer from './component/QuizeAnswer.vue'
import Login from './component/Login.vue'
import Statistic from './component/Statistic.vue'

export const routes = [
    { path: '', component: Home },
    { path: '/home', component: Home },
    { path: '/Quize', component: Quize },
    { path: '/QuizeAnswer', component: QuizeAnswer },
    { path: '/Statistic', component: Statistic },
    { path: '/Login', component: Login, meta: { conditionalRoute: true } }
]