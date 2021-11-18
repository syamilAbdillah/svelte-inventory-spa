<script>
	import FormControl from './FormControl.svelte'

	export let label = 'input'
	export let type
	export let value = ''
	export let placeholder = '...'
	export let required = false
	export let disabled = false
</script>

<FormControl label={label}>
	{#if type === 'email'}
		<input 
			type="email"
			bind:value
			placeholder="{placeholder}"
			required="{required}"
			disabled="{disabled}" 
			class="input input-bordered"
		>
	{:else if type === 'date'}
		<input 
			type="date"
			bind:value
			placeholder="{placeholder}"
			required="{required}"
			disabled="{disabled}" 
			class="input input-bordered"
		>
	{:else if type === 'password'}
		<input 
			type="password"
			bind:value
			placeholder="{placeholder}"
			required="{required}"
			disabled="{disabled}" 
			class="input input-bordered"
		>
	{:else if type === 'number'}
		<input 
			type="number"
			bind:value
			placeholder="{placeholder}"
			required="{required}"
			disabled="{disabled}" 
			class="input input-bordered"
		>
	{:else}
		<input 
			type="text"
			bind:value
			placeholder="{placeholder}"
			required="{required}"
			disabled="{disabled}" 
			class="input input-bordered"
		>
	{/if}
</FormControl>