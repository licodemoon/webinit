import {
	createRouter,
	createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: "首页"
		}
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: "登陆"
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/login.vue')
	},
	{
		path: '/myInfo',
		name: 'myInfo',
		meta: {
			title: "个人中心"
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/myInfo.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next();
	} else {
		let token = localStorage.getItem('Authorization');
		console.log("导航守卫:" + token)
		if (token === null || token === '') {
			alert("账号未登陆")
			next('/login');
		} else {
			next();
		}
	}
});

export default router
