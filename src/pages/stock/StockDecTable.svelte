<script>
	import { onMount } from 'svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import stockDecService from '../../machines/stock-dec-machine'
	import formatDate from '../../utils/formatDate'

	onMount(() => stockDecService.send('FETCHING'))

	const handleEdit = (stockDec) => stockDecService.send({ 
		type: 'EDIT', 
		payload: {
			...stockDec, 
			productId: stockDec.product.id
		}
	})

	const handleDelete = (stockDec) => confirm('are you sure ?') && stockDecService.send({
		type: 'DELETE',
		payload: { id: stockDec.id }
	})

	const fields = ['Kode Barang Masuk', 'Nama Barang', 'Kuantitas', 'Tanggal', 'Keterangan', 'Dibuat Oleh']
</script>	


<Table>
	<Thead slot="thead" fields={fields}></Thead>
	<tbody slot="tbody">
		{#if $stockDecService.matches('load')}
			<SkeletonRow colspan={fields.length + 2}></SkeletonRow>
		{:else}
			{#each $stockDecService.context.stockDecs as stockDec, index (stockDec.id)}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ stockDec.code }</td>
				<td>{ stockDec.product.name }</td>			
				<td>{ stockDec.qty }</td>
				<td>{ formatDate(stockDec.date) }</td>
				<td>{ stockDec.desc }</td>
				<td>{ stockDec.user.name }</td>
				<td>
					<EditButton 
						on:click={() => handleEdit(stockDec)}
						disabled={!$stockDecService.matches('idle')}
					/>
					<DeleteButton 
						on:click={() => handleDelete(stockDec)}
						disabled={!$stockDecService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>