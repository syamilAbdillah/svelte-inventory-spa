<script>
	export let label = 'label'
	export let error 
</script>

<div class="form-control mb-4">
	<label class="label">
		<span class="label-text">{ label }</span>
	</label>
	<slot></slot>
	{#if error}
		<label class="label">
			<span class="label-text-alt text-red-600">{ error }</span>
		</label>
	{/if}
</div>