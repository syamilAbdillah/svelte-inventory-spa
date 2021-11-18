<script>
	import Table from '../table/Table.svelte'
	import Thead from '../table/Thead.svelte'
	import Tbody from '../table/Tbody.svelte'

	import { suppliers, handleEdit, handleDelete } from '../../stores/supplier.js'

	const headFields = ['kode supplier', 'nama supplier', 'no.telp', 'email', 'alamat']
	const bodyFields = ['code', 'name', 'phone', 'email', 'address']
</script>	


<Table>
	<Thead slot="thead" fields={headFields}></Thead>
	<Tbody 
		slot="tbody" 
		records={$suppliers} 
		fields={bodyFields}
		on:edit={e => handleEdit(e.detail)}
		on:delete={e => handleDelete(e.detail.id)}
	></Tbody>
</Table>