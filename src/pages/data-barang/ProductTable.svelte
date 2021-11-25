<script>
	import { onMount } from 'svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import productService from './productMachine'

	onMount(() => productService.send('FETCHING'))

	const handleEdit = (product) => productService.send({ 
		type: 'EDIT', 
		payload: {
			...product, 
			supplierId: product.supplier.id, 
			unitId: product.unit.id, 
			categoryId: product.category.id
		}
	})

	const handleDelete = (product) => confirm('are you sure ?') && productService.send({
		type: 'DELETE',
		payload: { id: product.id }
	})

	const fields = ['kode barang', 'nama barang', 'satuan', 'supplier', 'kategori barang']
</script>	


<Table>
	<Thead slot="thead" fields={fields}></Thead>
	<tbody slot="tbody">
		{#if $productService.matches('load')}
			<SkeletonRow colspan={fields.length + 2}></SkeletonRow>
		{:else}
			{#each $productService.context.products as product, index (product.id)}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ product.code }</td>
				<td>{ product.name }</td>			
				<td>{ product.unit.name }</td>
				<td>{ product.supplier.name }</td>
				<td>{ product.category.name }</td>
				<td>
					<EditButton 
						on:click={() => handleEdit(product)}
						disabled={!$productService.matches('idle')}
					/>
					<DeleteButton 
						on:click={() => handleDelete(product)}
						disabled={!$productService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>