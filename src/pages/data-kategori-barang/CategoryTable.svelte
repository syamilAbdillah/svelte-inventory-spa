<script>
	import { onMount } from 'svelte'
	import { useMachine } from '@xstate/svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import categoryService from './categoryMachine'

	onMount(() => categoryService.send('FETCHING'))

	const handleEdit = (category) => categoryService.send({ 
		type: 'EDIT', 
		payload: {...category}
	})

	const handleDelete = (category) => confirm('are you sure ?') && categoryService.send({
		type: 'DELETE',
		payload: { id: category.id }
	})

	const fields = ['kategori barang']
</script>

<Table>
	<Thead 
		slot="thead"
		fields={fields}
	></Thead>
	<tbody slot="tbody">
		{#if $categoryService.matches('load')}
		<SkeletonRow colspan="3"></SkeletonRow>
		{:else}
			{#each $categoryService.context.categories as cateogry, index}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ cateogry.name }</td>
				<td>
					<EditButton 
						on:click={() => handleEdit(cateogry)}
						disabled={!$categoryService.matches('idle')}
					/>
					<DeleteButton 
						on:click={() => handleDelete(cateogry)}
						disabled={!$categoryService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>