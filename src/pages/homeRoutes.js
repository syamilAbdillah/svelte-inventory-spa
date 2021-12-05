import { wrap } from 'svelte-spa-router/wrap'
import RedirectToDashboard from './RedirectToDashboard.svelte'
import LoadingFallback from './LoadingFallback.svelte'
import { getAuthData } from './login/auth-store'

const SUPER_ADMIN = 'super admin'
const ADMIN = 'admin'
const GUDANG = 'gudang'

const roleGuard = (...roles) => () => {
	const {role} = getAuthData()
	return roles.includes(role)
}

const routes = {
	'/': RedirectToDashboard,
	'/dashboard': wrap({
		asyncComponent: () => import('./dashboard/Dashboard.svelte'),
		loadingComponent: LoadingFallback
	}),
	'/data-supplier': wrap({
		asyncComponent: () => import('./data-supplier/Supplier.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(ADMIN)]
	}),
	'/data-barang': wrap({
		asyncComponent: () => import('./data-barang/Product.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(ADMIN)]
	}),
	'/data-satuan': wrap({
		asyncComponent: () => import('./data-satuan/Unit.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(ADMIN)]
	}),
	'/data-kategori-barang': wrap({
		asyncComponent: () => import('./data-kategori-barang/Category.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(ADMIN)]
	}),
	'/laporan': wrap({
		asyncComponent: () => import('./laporan/Report.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(ADMIN, SUPER_ADMIN)]
	}),
	'/barang-masuk': wrap({
		asyncComponent: () => import('./stock/StockInc.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(ADMIN, GUDANG)]
	}),
	'/barang-keluar': wrap({
		asyncComponent: () => import('./stock/StockDec.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(ADMIN, GUDANG)]
	}),
	'/data-pengguna': wrap({
		asyncComponent: () => import('./data-pengguna/User.svelte'),
		loadingComponent: LoadingFallback,
		conditions: [roleGuard(SUPER_ADMIN)]
	}),
}

export default routes