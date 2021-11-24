<script>
	import SupplierForm from './SupplierForm.svelte'
	import SupplierTable from './SupplierTable.svelte'
	import MainContent from '../../components/main-content/MainContent.svelte'
</script>

<MainContent>
	<SupplierForm slot="form"></SupplierForm>
	<SupplierTable slot="table"></SupplierTable>
</MainContent>