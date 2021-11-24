import { createMachine, assign, interpret } from 'xstate'

async function getSuppliers() {
	try {
		const resp = await fetch('http://localhost:5000/supplier/')
		if(resp.status != 200) throw new Error(resp.status)

		const suppliers = await resp.json()
		const etag = resp.headers.get('etag')

		return {suppliers, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createSupplier(supplier){
	try {
		const resp = await fetch('http://localhost:5000/supplier', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(supplier)
		})

		if (resp.status !== 201) throw new Error(resp.status)

		const json = await resp.json()

		return json	
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteSupplier(id){
	try {
		const resp = await fetch(`http://localhost:5000/supplier/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (resp.status != 200) throw new Error(resp.status)	

		return await resp.json()
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateSupplier(supplier){
	try {
		const resp = await fetch(`http://localhost:5000/supplier/${supplier.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(supplier)
		})

		if(resp.status != 200) throw new Error(resp.status)

		return await resp.json()
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