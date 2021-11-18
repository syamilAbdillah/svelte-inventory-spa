<script>
	import Icon from 'svelte-awesome'
	
	export let tooltip = ''
	export let icon
</script>

<div data-tip="{tooltip}" class="tooltip">
	<button class="btn btn-ghost btn-circle" on:click>
		{#if icon}
		<Icon data={icon}></Icon>
		{/if}
	</button>
</div>