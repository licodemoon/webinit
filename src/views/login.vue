<template>
	<div class="bg">
		<div class="loginbox">
			<div style="font-size: 1.5rem;">登陆</div>
			<form class="loginform">
				<div>账号:</div>
				<div>
					<input v-model="loginData.userName" />
				</div>
				<div>
					密码：
				</div>
				<div>
					<input v-model="loginData.password" />
				</div>

				
			</form>
			<button @click="login">登陆</button>

		</div>

	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import {
		loginApi
	} from '../api/login.js'
	export default {
		name: "login",
		data() {
			return {
				loginData: {
					userName: "superadmin",
					password: "123456"
				}

			}
		},
		beforeCreate() {
			this.$store.commit('logout');
			console.log("清除登陆信息")
		},
		methods: {
			...mapMutations(['changeLogin']),
			login() {
				let _this = this;
				if (this.loginData.userName === '' || this.loginData.password === '') {
					alert('账号或密码不能为空');
				} else {
					loginApi(_this.loginData).then(res => {
						console.log(res.data);
						var token = res.data;
						// 将用户token保存到vuex中
						_this.changeLogin({
							Authorization: token
						});
						
						this.$router.push({
							'path': '/myInfo'
						})
						
					}).catch(error => {
						alert('账号或密码错误');
						console.log(error);
					})

				}
			}
		}
	}
</script>

<style>
	.bg {
		background-color: antiquewhite;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loginbox {
		background-color: dodgerblue;
		border: #1E90FF solid 1 px;
		border-radius: 0.3125rem;
		padding: 5%;
	}

	.loginform {
		width: 80%;
		margin: 0 auto;
		padding-top: 50%;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 1.375rem;

	}

	.loginform input {
		border-radius: 0.3125rem;
		border: none;
		font-size: 1.125rem;

	}
</style>
