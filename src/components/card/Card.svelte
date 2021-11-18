<script>
	export let title 
</script>

<div class="card bordered shadow p-6 bg-white">
	{#if title}
		<h2 class="card-title">{ title }</h2>
	{/if}

	<slot></slot>
</div>