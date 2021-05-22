<template>
	<div>
		<div>
			
		</div>
		<div>
			欢迎登陆：{{ueserName}}
		</div>
		<button @click="logout">
			退出登陆
		</button>
	</div>
</template>

<script>
	import {
		loginoutApi
	} from '../api/login.js'
	import { mapMutations, } from 'vuex';
	
	export default {
		name: "myInfo",
		data() {
			return {
				ueserName:""
			}
		},
		created(){
			var info=JSON.parse(localStorage.getItem('Authorization'))
			this.ueserName=info.Authorization;
			
		},
		methods: {
			...mapMutations(['logout']),
			logout() {
				var _this=this;
				loginoutApi().then(res => {
					console.log(res);
					_this.logout();
					
					this.$router.push({
						'path': '/login'
					})
				}).catch(error => {
						alert('未登陆');
						console.log(error);
					})
				}
			}
		}
</script>

<style>
</style>
