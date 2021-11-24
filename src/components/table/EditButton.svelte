<script>
	import { faEdit } from '@fortawesome/free-solid-svg-icons'
	import ActionButton from './ActionButton.svelte'

	export let disabled = false
</script>

<ActionButton icon={faEdit} tooltip="edit" {disabled} on:click></ActionButton>