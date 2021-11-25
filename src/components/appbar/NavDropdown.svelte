<script>
	import Icon from 'svelte-awesome'
	import { link } from 'svelte-spa-router'
	import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="dropdown dropdown-end dropdown-hover text-gray-600">
	<a tabindex="0" role="button" class="btn btn-ghost">
		<div class="avatar">
			<div class="mr-2 w-10 h-10 rounded-full">
				<img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" alt="User profile">
			</div>
		</div>
		username
	</a>
	<ul class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 compact">
		<li>
			<a href="/" use:link>
				<Icon data={faUser} class="mr-4"></Icon>
				profile
			</a>
		</li>
		<li>
			<a href="/login" use:link>
				<Icon data={faSignOutAlt} class="mr-4"></Icon>
				logout
			</a>
		</li>
	</ul>
</div>