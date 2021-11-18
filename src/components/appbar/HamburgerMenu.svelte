<script>
	import Icon from 'svelte-awesome'
	import { faBars } from '@fortawesome/free-solid-svg-icons'

	export let toggleId
</script>

<label for="{toggleId}" class="btn btn-ghost lg:hidden text-gray-600">
	<Icon data={faBars} />
</label>