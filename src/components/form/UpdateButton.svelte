<script>
	import Icon from 'svelte-awesome'
	import { faPenNib } from '@fortawesome/free-solid-svg-icons'
</script>

<button class="btn btn-primary" on:click>
	<Icon data={faPenNib} class="mr-4"></Icon>
	<slot>update</slot>
</button>

