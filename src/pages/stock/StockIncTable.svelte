<script>
	import { onMount } from 'svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import stockIncService from './stockIncMachine'
	import formatDate from '../../utils/formatDate'

	onMount(() => stockIncService.send('FETCHING'))

	const handleEdit = (stockInc) => stockIncService.send({ 
		type: 'EDIT', 
		payload: {
			...stockInc, 
			productId: stockInc.product.id
		}
	})

	const handleDelete = (stockInc) => confirm('are you sure ?') && stockIncService.send({
		type: 'DELETE',
		payload: { id: stockInc.id }
	})

	const fields = ['Kode Barang Masuk', 'Nama Barang', 'Kuantitas', 'Tanggal', 'Keterangan', 'Dibuat Oleh']
</script>	


<Table>
	<Thead slot="thead" fields={fields}></Thead>
	<tbody slot="tbody">
		{#if $stockIncService.matches('load')}
			<SkeletonRow colspan={fields.length + 2}></SkeletonRow>
		{:else}
			{#each $stockIncService.context.stockIncs as stockInc, index (stockInc.id)}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ stockInc.code }</td>
				<td>{ stockInc.product.name }</td>			
				<td>{ stockInc.qty }</td>
				<td>{ formatDate(stockInc.date) }</td>
				<td>{ stockInc.desc }</td>
				<td>{ stockInc.user.name }</td>
				<td>
					<EditButton 
						on:click={() => handleEdit(stockInc)}
						disabled={!$stockIncService.matches('idle')}
					/>
					<DeleteButton 
						on:click={() => handleDelete(stockInc)}
						disabled={!$stockIncService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>