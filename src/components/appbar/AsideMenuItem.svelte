<script>
	import Icon from 'svelte-awesome'
	import { link } from 'svelte-spa-router'
	import active from 'svelte-spa-router/active'

	export let icon
	export let text
	export let to = '#'
</script>

<li class="hover:text-white mb-2 active">
	<a href="{to}" use:link use:active>
		<Icon data={icon} class="mr-4" /> 
		{text}
	</a>
</li>