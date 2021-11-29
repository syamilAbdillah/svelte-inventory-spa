import { createMachine, assign, interpret } from 'xstate'
import request from '../../utils/request'

async function getSuppliers() {
	try {
		const resp = await request.get('/supplier')
		const suppliers = resp.data
		const etag = resp.headers.etag

		return {suppliers, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createSupplier(supplier){
	try {
		const resp = await request.post('/supplier', supplier)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteSupplier(id){
	try {
		const resp = await request.delete(`/supplier/${id}`)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateSupplier(supplier){
	try {
		const resp = await request.put(`/supplier/${supplier.id}`,supplier)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
} 

export const supplierMachine = createMachine({
	id: 'supplier-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		suppliers: [],
		supplier: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editSupplier'
				},
				CREATE: {
					target: 'create'
				}
			}
		},
		load: {
			entry: 'resetSupplierForm',
			invoke: {
				id: 'get-suppliers',
				src: (ctx, e) => getSuppliers,
				onDone: {
					target: 'idle',
					actions: 'successGetSuppliers'
				},
				onError: {
					target: 'load'
				}
			}
		},
		edit: {
			on: {
				SAVE_CHANGES: {
					target: 'update'
				},
				CANCEL: {
					target: 'idle',
					actions: 'resetSupplierForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-supplier',
				src: (ctx, e) => updateSupplier({...ctx.supplier, ...e.payload}),
				onDone: {
					target:'load',
					actions: 'resetSupplierForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-supplier',
				src: (_, e) => deleteSupplier(e.payload.id),
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-supplier',
				src: (ctx, e) => createSupplier(e.payload),
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editSupplier: assign({
			supplier: (ctx, e) => ({...e.payload})
		}),
		resetSupplierForm: assign({
			supplier: (ctx, _) => ({})
		}),
		successGetSuppliers: assign({
			suppliers: (ctx, e) => {
				return e.data.suppliers.data
			},
			etag: (ctx, e) => e.data.etag
		})
	}
})

const supplierService = interpret(supplierMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default supplierService