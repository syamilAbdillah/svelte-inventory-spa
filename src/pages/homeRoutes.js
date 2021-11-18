import { wrap } from 'svelte-spa-router/wrap'
import RedirectToDashboard from './RedirectToDashboard.svelte'

const routes = {
	'/': RedirectToDashboard,
	'/dashboard': wrap({
		asyncComponent: () => import('./dashboard/Dashboard.svelte')
	}),
	'/data-supplier': wrap({
		asyncComponent: () => import('./data-supplier/Supplier.svelte')
	}),
	'/data-barang': wrap({
		asyncComponent: () => import('./data-barang/Product.svelte')
	}),
	'/data-satuan': wrap({
		asyncComponent: () => import('./data-satuan/Unit.svelte')
	}),
	'/data-kategori-barang': wrap({
		asyncComponent: () => import('./data-kategori-barang/Category.svelte')
	}),
	'/laporan': wrap({
		asyncComponent: () => import('./laporan/Report.svelte')
	}),
	'/barang-masuk': wrap({
		asyncComponent: () => import('./stock/StockInc.svelte')
	}),
	'/barang-keluar': wrap({
		asyncComponent: () => import('./stock/StockDec.svelte')
	}),
	'/data-pengguna': wrap({
		asyncComponent: () => import('./data-pengguna/User.svelte')
	}),
}

export default routes