<script>
	import FormControl from './FormControl.svelte'

	export let label = 'select field'
	export let value
	export let error
	export let name
</script>

<FormControl {label} {error}>
	<select {name} on:change bind:value class="select select-bordered">
		<slot></slot>
	</select>
</FormControl>