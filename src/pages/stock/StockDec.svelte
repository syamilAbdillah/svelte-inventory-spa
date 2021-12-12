<script>
	import MainContent from '../../components/main-content/MainContent.svelte'
	import StockDecForm from './StockDecForm.svelte'
	import StockDecTable from './StockDecTable.svelte'
</script>

<MainContent>
	<StockDecForm slot="form" />
	<StockDecTable slot="table" />
</MainContent>