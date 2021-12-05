<script>
	import MainContent from '../../components/main-content/MainContent.svelte'
	import UserForm from './UserForm.svelte'
	import UserTable from './UserTable.svelte'
</script>

<MainContent>
	<UserForm slot="form"></UserForm>
	<UserTable slot="table"></UserTable>
</MainContent>