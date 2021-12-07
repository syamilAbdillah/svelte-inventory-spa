<script>
	import Icon from 'svelte-awesome'

	export let title = 'total'
	export let value = 0
	export let desc = ''
	export let icon 
</script>

<div class="stat rounded shadow">
	<div class="stat-title">{ title }</div>
	<div class="stat-value">{ value }</div>
	<div class="stat-desc">{ desc }</div>
	<div class="stat-figure">
		<button class="btn btn-circle" disabled>
			<Icon data={icon}/>
		</button>
	</div>
</div>