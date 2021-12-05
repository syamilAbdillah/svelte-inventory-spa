<script>
	import Router, { replace, link } from 'svelte-spa-router'
	import routes from './homeRoutes'
	import Appbar from '../components/appbar/Appbar.svelte'


	const fallback = (e) => {
		console.log(e)
		replace('/dashboard')
	}
</script>

<Appbar>
	<main slot="main-content" class="p-3 bg-base-200 min-h-screen pt-20 relative">
	    <Router {routes} on:conditionsFailed={fallback} />
  	</main>
</Appbar>