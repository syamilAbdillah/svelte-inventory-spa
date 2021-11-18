<script>
	export let toggleId
</script>

<div class="drawer-side">
	<label for="{toggleId}" class="drawer-overlay"></label>
	<slot name="aside-menu"></slot>
</div>