<script>
	import FormControl from './FormControl.svelte'

	export let options = [{ id: 1, text: 'not found :)' }]
	export let value = options[0].id
	export let label = 'select'
</script>

<FormControl label="{label}">
	<select bind:value class="select select-bordered">
		{#each options as option, index}
			<option value="{option.id}">{option.text}</option>
		{/each}
	</select>
</FormControl>