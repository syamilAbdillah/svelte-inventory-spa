<script>
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

	const active = true
</script>

<ul class="menu p-4 overflow-y-quto w-60 bg-neutral text-gray-300">
	<a role="button" href="/" class="btn btn-neutral">brand</a>
	<AsideMenuTitle text="Main Menu"></AsideMenuTitle>
	<AsideMenuItem icon={faTachometerAlt} text="Dashboard" to="/dashboard"></AsideMenuItem>
	<AsideMenuItem icon={faTruck} text="Data Supplier" to="/data-supplier"></AsideMenuItem>
	<AsideMenuItem icon={faFolder} text="Data Barang" to="/data-barang"></AsideMenuItem>
	<AsideMenuItem icon={faRulerCombined} text="Data Satuan" to="/data-satuan"></AsideMenuItem>
	<AsideMenuItem icon={faBoxes} text="Data Kategori" to="/data-kategori-barang"></AsideMenuItem>
	<AsideMenuItem icon={faClipboardCheck} text="Laporan" to="/laporan"></AsideMenuItem>
	<AsideMenuItem icon={faFolderPlus} text="Barang Masuk" to="/barang-masuk"></AsideMenuItem>
	<AsideMenuItem icon={faFolderMinus} text="Barang Keluar" to="/barang-keluar"></AsideMenuItem>
	<AsideMenuItem icon={faUser} text="Data Pengguna" to="/data-pengguna"></AsideMenuItem>
</ul>