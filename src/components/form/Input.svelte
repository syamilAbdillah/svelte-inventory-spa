<script>
	import FormControl from './FormControl.svelte'

	export let label = 'input'
	export let type
	export let value = ''
	export let placeholder = '...'
	export let required = false
	export let disabled = false
	export let name = ''
	export let error
</script>

<FormControl {label} {error}>
	{#if type === 'email'}
		<input 
			type="email"
			bind:value
			on:change
			{placeholder}
			{required}
			{disabled}
			{name} 
			class="input input-bordered"
		>
	{:else if type === 'date'}
		<input 
			type="date"
			bind:value
			on:change
			{placeholder}
			{required}
			{disabled}
			{name} 
			class="input input-bordered"
		>
	{:else if type === 'password'}
		<input 
			type="password"
			bind:value
			on:change
			{placeholder}
			{required}
			{disabled}
			{name} 
			class="input input-bordered"
		>
	{:else if type === 'number'}
		<input 
			type="number"
			bind:value
			on:change
			{placeholder}
			{required}
			{disabled}
			{name} 
			class="input input-bordered"
		>
	{:else}
		<input 
			type="text"
			bind:value
			on:change
			{placeholder}
			{required}
			{disabled}
			{name} 
			class="input input-bordered"
		>
	{/if}
</FormControl>