<script>
	export let colspan = 1
</script>

<tr>
	<td colspan="{colspan}" class="bg-neutral text-center">
		<div class="skeleton"></div>
	</td>
</tr>
<tr>
	<td colspan="{colspan}" class="bg-neutral text-center">
		<div class="skeleton"></div>
	</td>
</tr>
<tr>
	<td colspan="{colspan}" class="bg-neutral text-center">
		<div class="skeleton"></div>
	</td>
</tr>

<style>
	.skeleton{
		width: 100%;
		height: 3rem;
		background: rgba(209, 213, 219, .3);
		border-radius: .5rem;
		animation: skeleton 1s linear infinite alternate;
	}

	@keyframes skeleton {
		0% {
			opacity: 0%;
		}
		100% {
			opacity: 100%;
		}
	}
</style>