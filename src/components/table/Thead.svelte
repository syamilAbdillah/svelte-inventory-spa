<script>
	export let fields = []
	export let action = true
</script>

<thead>
	<tr>
		<th>#</th>
		{#each fields as field, index}
			<th>{ field }</th>
		{/each}
		{#if action}
			<th>action</th>
		{/if}
	</tr>
</thead>