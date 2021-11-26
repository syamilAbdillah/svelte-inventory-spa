<script>
	import { fade } from 'svelte/transition'
</script>

<div class="grid lg:grid-cols-3 gap-4" in:fade={{delay: 200}} out:fade={{duration: 200}}>
	<div>
		<slot name="form"></slot>
	</div>
	<div class="relative lg:col-span-2 overflow-x-hidden">
		<slot name="table"></slot>
	</div>
</div>