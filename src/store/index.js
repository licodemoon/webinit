import {
	createStore
} from 'vuex'

export default createStore({
	state: {
		// 存储token
		Authorization: ''
	},

	mutations: {
		// 修改token，并将token存入localStorage
		changeLogin(state, user) {
			state.Authorization = user;
			localStorage.setItem('Authorization', JSON.stringify(user));
	},
		logout(state){
			state.Authorization = undefined;
			localStorage.removeItem('Authorization');
		}
		
	},
	actions: {},
	modules: {}
})
