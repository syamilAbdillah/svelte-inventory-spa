<script>
	import { createEventDispatcher } from 'svelte'
	import SkeletonRow from './SkeletonRow.svelte'
	import DeleteButton from './DeleteButton.svelte'
	import EditButton from './EditButton.svelte'

	const dispatch = createEventDispatcher()

	const dispatchEditEvent = record => dispatch('edit', record)
	const dispatchDeleteEvent = id => dispatch('delete', {id})  

	export let records = []
	export let fields = []
	export let keyRecord = 'id'
</script>

<tbody>
	{#if records.length < 1}
		<SkeletonRow colspan={fields.length + 2}></SkeletonRow>
	{:else}
		{#each records as record, index (record[keyRecord])}
		<tr>
			<th>{ index + 1 }</th>
		{#each fields as field}
			<td>{ record[field] }</td>
		{/each}
			<td>
				<EditButton on:click={() => dispatchEditEvent(record)}></EditButton>
				<DeleteButton on:click={() => dispatchDeleteEvent(record[keyRecord])}></DeleteButton>
			</td>
		</tr>
		{/each}
	{/if}
</tbody>