<script>
	import Icon from 'svelte-awesome'
	import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
</script>

<button class="btn btn-ghost my-4" on:click>
	<Icon data={faWindowClose} class="mr-4"></Icon>
	<slot>cancel</slot>
</button>

