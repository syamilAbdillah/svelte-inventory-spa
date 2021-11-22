<script>
	import MainContent from '../../components/main-content/MainContent.svelte'
	import UnitForm from './UnitForm.svelte'
	import UnitTable from './UnitTable.svelte'
</script>

<MainContent>
	<UnitForm slot="form"></UnitForm>
	<UnitTable slot="table"></UnitTable>
</MainContent>