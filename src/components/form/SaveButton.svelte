<script>
	import Icon from 'svelte-awesome'
	import { faSave } from '@fortawesome/free-solid-svg-icons'

	export let disabled = false
</script>

<button class="btn btn-primary" on:click {disabled}>
	<Icon data={faSave} class="mr-4"></Icon>
	<slot>save</slot>
</button>

