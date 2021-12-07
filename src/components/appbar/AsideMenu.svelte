<script>
	import { createEventDispatcher } from 'svelte'
	import AsideMenuItem from './AsideMenuItem.svelte'
	import AsideMenuTitle from './AsideMenuTitle.svelte'
	import { 
		faTachometerAlt, 
		faTruck, 
		faFolder, 
		faRulerCombined,
		faBoxes,
		faFolderMinus, 
		faFolderPlus,
		faClipboardCheck,
		faUser
	} from '@fortawesome/free-solid-svg-icons'
	import { authStore } from '../../pages/login/auth-store'

	const dispatch = createEventDispatcher()
	const handleClick = () => dispatch('close')

	const ADMIN = 'admin'
	const SUPER_ADMIN = 'super admin'
	const GUDANG = 'gudang'

	const menus = [
		{ icon: faTachometerAlt, text: 'Dashboard', to: '/dashboard', roles: [SUPER_ADMIN, ADMIN, GUDANG] },
		{ icon: faTruck, text: 'Data Supplier', to: '/data-supplier', roles: [ADMIN] },
		{ icon: faFolder, text: 'Data Barang', to: '/data-barang', roles: [ADMIN] },
		{ icon: faRulerCombined, text: 'Data Satuan', to: '/data-satuan', roles: [ADMIN] },
		{ icon: faBoxes, text: 'Data Kategori', to: '/data-kategori-barang', roles: [ADMIN] },
		{ icon: faClipboardCheck, text: 'Laporan', to: '/laporan', roles: [SUPER_ADMIN, ADMIN] },
		{ icon: faFolderPlus, text: 'Barang Masuk', to: '/barang-masuk', roles: [ADMIN, GUDANG] },
		{ icon: faFolderMinus, text: 'Barang Keluar', to: '/barang-keluar', roles: [ADMIN, GUDANG] },
		{ icon: faUser, text: 'Data Pengguna', to: '/data-pengguna', roles: [SUPER_ADMIN] }
	]
</script>

<ul class="menu p-4 overflow-y-quto w-60 bg-neutral text-gray-300">
	<!-- <a role="button" on:click={handleClick} href="/" class="btn btn-neutral">brand</a> -->
	<AsideMenuTitle text="Main Menu"/>

	{#each menus as menu, index}
		{#if menu.roles.includes($authStore.role)}
			<AsideMenuItem on:click={handleClick} icon={menu.icon} text={menu.text} to={menu.to}/>
		{/if}
	{/each}
</ul>