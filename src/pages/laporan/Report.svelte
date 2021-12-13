<script>
	import Icon from 'svelte-awesome'
	import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import request from '../../utils/request'

	const fields = ['Kode Barang', 'Nama Barang', 'Kategori Barang', 'Supplier', 'Stok Saat Ini']
	const reports = request.get('/stock/report')
	const action = false
</script>

<button class="btn btn-success mb-4">
	<span class="mr-2">
		export
	</span>
	<Icon data={faFileCsv} />
</button>
<Table>
	<Thead slot="thead" {fields} {action}/>
	<tbody slot="tbody">
	{#await reports}
		<SkeletonRow colspan={fields.length + 1} />
	{:then result}
			{#each result.data.data as product, index}
				<tr>
					<th>{ index + 1 }</th>
					<td>{ product.code }</td>
					<td>{ product.name }</td>
					<td>{ product.category.name }</td>
					<td>{ product.supplier.code } - { product.supplier.name }</td>
					<td>{ product.stocks.total } - { product.unit.name }</td>
				</tr>
			{/each}
	{/await}
	</tbody>		
</Table>