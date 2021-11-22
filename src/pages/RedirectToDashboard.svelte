<script>
	import { replace } from 'svelte-spa-router'

	localStorage.getItem('auth-credential') ? replace('/dashboard'): replace('/login')
</script>