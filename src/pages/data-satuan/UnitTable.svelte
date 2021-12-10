<script>
	import { onMount } from 'svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import unitService from '../../machines/unit-machine'

	onMount(() => unitService.send('FETCHING'))

	const handleEdit = (unit) => unitService.send({ 
		type: 'EDIT', 
		payload: {...unit}
	})

	const handleDelete = (unit) => confirm('are you sure ?') && unitService.send({
		type: 'DELETE',
		payload: { id: unit.id }
	})

	const fields = ['satuan']
</script>

<Table>
	<Thead 
		slot="thead"
		fields={fields}
	></Thead>
	<tbody slot="tbody">
		{#if $unitService.matches('load')}
		<SkeletonRow colspan="3"></SkeletonRow>
		{:else}
			{#each $unitService.context.units as unit, index}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ unit.name }</td>
				<td>
					<EditButton 
						on:click={() => handleEdit(unit)}
						disabled={!$unitService.matches('idle')}
					/>
					<DeleteButton 
						on:click={() => handleDelete(unit)}
						disabled={!$unitService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>