<script>
	import { onMount } from 'svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import supplierService from '../../machines/supplier-machine'

	onMount(() => supplierService.send('FETCHING'))

	const handleEdit = (supplier) => supplierService.send({ 
		type: 'EDIT', 
		payload: {...supplier}
	})

	const handleDelete = (supplier) => confirm('are you sure ?') && supplierService.send({
		type: 'DELETE',
		payload: { id: supplier.id }
	})

	const fields = ['kode supplier', 'nama supplier', 'no.telp', 'email', 'alamat']
</script>	


<Table>
	<Thead slot="thead" fields={fields}></Thead>
	<tbody slot="tbody">
		{#if $supplierService.matches('load')}
			<SkeletonRow colspan="7"></SkeletonRow>
		{:else}
			{#each $supplierService.context.suppliers as supplier, index}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ supplier.code }</td>
				<td>{ supplier.name }</td>
				<td>{ supplier.phone }</td>
				<td>{ supplier.email }</td>
				<td>{ supplier.address }</td>
				<td>
					<EditButton 
						on:click={() => handleEdit(supplier)}
						disabled={!$supplierService.matches('idle')}
					/>
					<DeleteButton 
						on:click={() => handleDelete(supplier)}
						disabled={!$supplierService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>