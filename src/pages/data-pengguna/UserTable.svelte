<script>
	import { onMount } from 'svelte'
	import Table from '../../components/table/Table.svelte'
	import Thead from '../../components/table/Thead.svelte'
	import Tbody from '../../components/table/Tbody.svelte'
	import DeleteButton from '../../components/table/DeleteButton.svelte'
	import EditButton from '../../components/table/EditButton.svelte'
	import SkeletonRow from '../../components/table/SkeletonRow.svelte'
	import userService from '../../machines/user-machine'

	onMount(() => userService.send('FETCHING'))

	const handleEdit = (user) => userService.send({ 
		type: 'EDIT', 
		payload: {...user}
	})

	const handleDelete = (user) => confirm('are you sure ?') && userService.send({
		type: 'DELETE',
		payload: { id: user.id }
	})

	const fields = ['nama', 'email', 'role']
</script>	


<Table>
	<Thead slot="thead" fields={fields}></Thead>
	<tbody slot="tbody">
		{#if $userService.matches('load')}
			<SkeletonRow colspan="5"></SkeletonRow>
		{:else}
			{#each $userService.context.users as user, index}
			<tr>
				<th>{ index + 1 }</th>
				<td>{ user.name }</td>
				<td>{ user.email }</td>
				<td>{ user.role }</td>
				<td>
					<EditButton 
						on:click={() => handleEdit(user)}
						disabled={!$userService.matches('idle')}
					/>
					<DeleteButton 
						on:click={() => handleDelete(user)}
						disabled={!$userService.matches('idle')}
					/>
				</td>
			</tr>
			{/each}
		{/if}
	</tbody>
</Table>