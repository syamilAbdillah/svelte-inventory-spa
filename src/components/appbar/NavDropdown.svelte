<script>
	import Icon from 'svelte-awesome'
	import { link, replace } from 'svelte-spa-router'
	import jwt_decode from 'jwt-decode'
	import { faUser, faSignOutAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons'
	import request from '../../utils/request'
	import setCookie from '../../utils/setCookie'
	import getCookie from '../../utils/getCookie'
	import { resetAuthData, authStore } from '../../pages/login/auth-store'

	async function handleLogout(e){
		const _ = await request.delete('/user/logout')
		setCookie('refresh-token', '')
		resetAuthData()
		replace('/login')
	}

	console.log($authStore.name)
</script>

<div class="dropdown dropdown-end dropdown-hover text-gray-600">
	<a tabindex="0" role="button" class="btn btn-ghost">
		<div class="avatar">
			<div class="mr-2 w-10 h-10 rounded-full">
				<img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" alt="User profile">
			</div>
		</div>
		<span class="mr-2">
			{ $authStore.name || ""}
		</span>
		<Icon data={faAngleDown}/>
	</a>
	<ul class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 compact">
		<li>
			<a href="/" use:link>
				<Icon data={faUser} class="mr-4"></Icon>
				profile
			</a>
		</li>
		<li>
			<a on:click={handleLogout}>
				<Icon data={faSignOutAlt} class="mr-4"></Icon>
				logout
			</a>
		</li>
	</ul>
</div>