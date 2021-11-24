<script>
	import Icon from 'svelte-awesome'
	import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

	export let disabled = false
</script>

<button type="reset" class="btn btn-ghost my-4" on:click  {disabled}>
	<Icon data={faWindowClose} class="mr-4"></Icon>
	<slot>cancel</slot>
</button>

