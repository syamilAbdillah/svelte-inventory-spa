import { wrap } from 'svelte-spa-router/wrap'
import RedirectToDashboard from './RedirectToDashboard.svelte'
import LoadingFallback from './LoadingFallback.svelte'

const routes = {
	'/': RedirectToDashboard,
	'/dashboard': wrap({
		asyncComponent: () => import('./dashboard/Dashboard.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/data-supplier': wrap({
		asyncComponent: () => import('./data-supplier/Supplier.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/data-barang': wrap({
		asyncComponent: () => import('./data-barang/Product.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/data-satuan': wrap({
		asyncComponent: () => import('./data-satuan/Unit.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/data-kategori-barang': wrap({
		asyncComponent: () => import('./data-kategori-barang/Category.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/laporan': wrap({
		asyncComponent: () => import('./laporan/Report.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/barang-masuk': wrap({
		asyncComponent: () => import('./stock/StockInc.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/barang-keluar': wrap({
		asyncComponent: () => import('./stock/StockDec.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/data-pengguna': wrap({
		asyncComponent: () => import('./data-pengguna/User.svelte'),
		loadingComponent: LoadingFallback
	}),
}

export default routes