<script>
	import Card from '../card/Card.svelte'
</script>

<Card>
	<div class="overflow-x-auto">
		<table class="table w-full table-zebra">
			<slot name="thead"><thead></thead></slot>
			<slot name="tbody"><tbody></tbody></slot>
		</table>
	</div>
</Card>