<script>
	import Table from '../table/Table.svelte'
	import Thead from '../table/Thead.svelte'
	import Tbody from '../table/Tbody.svelte'

	import { users, handleEdit, handleDelete } from '../../stores/user.js'

	// export let users = []
	const fields = ['name', 'email', 'role']
</script>

<Table>
	<Thead fields={fields} slot="thead"/>
	<Tbody 
		records={$users} 
		fields={fields}
		on:edit={e => handleEdit(e.detail)}
		on:delete={e => handleDelete(e.detail.id)} 
		slot="tbody"
	/>
</Table>