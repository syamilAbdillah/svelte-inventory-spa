<script>
	export let fields = []
</script>

<thead>
	<tr>
		<th>#</th>
		{#each fields as field, index}
			<th>{ field }</th>
		{/each}
		<th>action</th>
	</tr>
</thead>