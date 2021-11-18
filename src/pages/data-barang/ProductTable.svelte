<script>
	import Table from '../table/Table.svelte'
	import Thead from '../table/Thead.svelte'
	import SkeletonRow from '../table/SkeletonRow.svelte'
	import EditButton from '../table/EditButton.svelte'
	import DeleteButton from '../table/DeleteButton.svelte'

	import { products, handleEdit, handleDelete } from '../../stores/product.js'

	const fields = ['kode barang', 'nama barang', 'satuan', 'supplier', 'kategori barang']
</script>	


<Table>
	<Thead slot="thead" fields={fields}></Thead>
	<tbody slot="tbody">
		{#if $products.length < 1}
			<SkeletonRow colspan={fields.length + 2}></SkeletonRow>
		{:else}
			{#each $products as product, index}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ product.code }</td>
				<td>{ product.name }</td>			
				<td>{ product.unit.name }</td>
				<td>{ product.supplier.name }</td>
				<td>{ product.category.name }</td>
				<td>
					<EditButton on:click={() => handleEdit(product)}></EditButton>
					<DeleteButton on:click={() => handleDelete(product.id)}></DeleteButton>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>