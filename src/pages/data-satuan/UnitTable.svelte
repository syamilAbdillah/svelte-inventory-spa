<script>
	import Table from '../table/Table.svelte'
	import Thead from '../table/Thead.svelte'
	import Tbody from '../table/Tbody.svelte'
	import { units, handleDelete, handleEdit } from '../../stores/unit.js'

	const bodyFields = ['name']
	const headFields = ['satuan']
</script>

<Table>
	<Thead 
		slot="thead"
		fields={headFields}
	></Thead>
	<Tbody
		slot="tbody" 
		fields={bodyFields}
		on:delete={e => handleDelete(e.detail.id)}
		on:edit={e => handleEdit(e.detail)}
		records={$units}
	></Tbody>
</Table>