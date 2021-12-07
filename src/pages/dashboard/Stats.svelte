<script>
	import Icon from 'svelte-awesome'
	import { faUser, faFolder, faFolderMinus, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
	import Stat from './Stat.svelte'
	import request from '../../utils/request'

	let promise = request.get('/dashboard/stats')
</script>

{#await promise}
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2 gap-4">
		<div class="animate-pulse w-full h-36 rounded bg-gray-200"></div>
		<div class="animate-pulse w-full h-36 rounded bg-gray-200"></div>
		<div class="animate-pulse w-full h-36 rounded bg-gray-200"></div>
		<div class="animate-pulse w-full h-36 rounded bg-gray-200"></div>
	</div>
{:then response}
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2 gap-4">
		<Stat title="Barang" desc="Total Data Barang" value="{response.data.data.totalProduct}" icon={faFolder}/>
		<Stat title="Pengguna" desc="Total Data Pengguna" value="{response.data.data.totalUser}" icon={faUser}/>
		<Stat title="Barang Masuk" desc="Total Data Barang Masuk" value="{response.data.data.totalStockInc}" icon={faFolderPlus}/>
		<Stat title="Barang Keluar" desc="Total Data Barang Keluar" value="{response.data.data.totalStockDec}" icon={faFolderMinus}/>
	</div>
{/await}
