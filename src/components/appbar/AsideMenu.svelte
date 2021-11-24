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

	const dispatch = createEventDispatcher()

	const handleClick = () => dispatch('close')
</script>

<ul class="menu p-4 overflow-y-quto w-60 bg-neutral text-gray-300">
	<a role="button" on:click={handleClick} href="/" class="btn btn-neutral">brand</a>
	<AsideMenuTitle text="Main Menu"></AsideMenuTitle>
	<AsideMenuItem on:click={handleClick} icon={faTachometerAlt} text="Dashboard" to="/dashboard"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faTruck} text="Data Supplier" to="/data-supplier"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faFolder} text="Data Barang" to="/data-barang"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faRulerCombined} text="Data Satuan" to="/data-satuan"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faBoxes} text="Data Kategori" to="/data-kategori-barang"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faClipboardCheck} text="Laporan" to="/laporan"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faFolderPlus} text="Barang Masuk" to="/barang-masuk"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faFolderMinus} text="Barang Keluar" to="/barang-keluar"></AsideMenuItem>
	<AsideMenuItem on:click={handleClick} icon={faUser} text="Data Pengguna" to="/data-pengguna"></AsideMenuItem>
</ul>