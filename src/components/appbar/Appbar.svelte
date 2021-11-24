<script>
	import Icon from 'svelte-awesome'
	import Navbar from './Navbar.svelte'
	import Sidebar from './Sidebar.svelte'
	import AsideMenu from './AsideMenu.svelte'
	import HamburgerMenu from './HamburgerMenu.svelte'
	import NavDropdown from './NavDropdown.svelte'

	const TOGGLE_ID = 'appbar-toggle'
	let toggle = false
</script>


<div class="drawer drawer-mobile min-h-screen">
	<input type="checkbox" bind:checked={toggle} class="drawer-toggle" id="{TOGGLE_ID}">

	<div class="drawer-content">
		<Navbar>
			<HamburgerMenu slot="start" toggleId={TOGGLE_ID}/>
			<NavDropdown slot="end"></NavDropdown>
		</Navbar>

		<slot name="main-content"></slot>
	</div>
	
	<Sidebar toggleId={TOGGLE_ID}>
		<AsideMenu on:close={() => toggle = false} slot="aside-menu"></AsideMenu>
	</Sidebar>
</div>