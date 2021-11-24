<script>
	import Icon from 'svelte-awesome'
	import { faPenNib } from '@fortawesome/free-solid-svg-icons'


	export let disabled = false
</script>

<button class="btn btn-primary" type="submit" on:click {disabled}>
	<Icon data={faPenNib} class="mr-4"></Icon>
	<slot>update</slot>
</button>

