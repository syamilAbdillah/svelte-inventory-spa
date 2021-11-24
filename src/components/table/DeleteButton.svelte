<script>
	import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
	import ActionButton from './ActionButton.svelte'

	export let disabled = false
</script>

<ActionButton icon={faTrashAlt} tooltip="delete" {disabled} on:click></ActionButton>