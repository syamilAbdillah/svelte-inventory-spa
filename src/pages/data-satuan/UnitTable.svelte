<script>
	import { onMount } from 'svelte'
	import { useMachine } from '@xstate/svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import unitService from './unitMachine'

	onMount(() => unitService.send('FETCHING'))

	const bodyFields = ['name']
	const headFields = ['satuan']
</script>

<Table>
	<Thead 
		slot="thead"
		fields={headFields}
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
						on:click={
							() => unitService.send({ 
								type: 'EDIT', 
								payload: {...unit}
							})
						}

						disabled={!$unitService.matches('idle')}
					/>
					<DeleteButton 
						on:click={
							() => unitService.send({
								type: 'DELETE',
								payload: { id: unit.id }
							})
						}

						disabled={!$unitService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>