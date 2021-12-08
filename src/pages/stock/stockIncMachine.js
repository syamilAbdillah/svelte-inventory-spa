import { createMachine, assign, interpret } from 'xstate'
import request from '../../utils/request'

async function getStockIncs() {
	try {
		const resp = await request.get('/stock/inc')
		const stockIncs = resp.data
		const etag = resp.headers.etag

		return {stockIncs, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createStockInc(stockInc){
	try {
		const resp = await request.post('/stock/inc', stockInc)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteStockInc(id){
	try {
		const resp = await request.delete(`/stock/inc/${id}`)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateStockInc(stockInc){
	try {
		const resp = await request.put(`/stock/inc/${stockInc.id}`,stockInc)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
} 

export const stockIncMachine = createMachine({
	id: 'stock-inc-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		stockIncs: [],
		stockInc: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editStockInc'
				},
				CREATE: {
					target: 'create'
				}
			}
		},
		load: {
			entry: 'resetStockIncForm',
			invoke: {
				id: 'get-stock-incs',
				src: (ctx, e) => getStockIncs,
				onDone: {
					target: 'loadOptions',
					actions: 'successGetStockIncs'
				},
				onError: {
					target: 'load'
				}
			}
		},
		loadOptions: {
			after: {
				1000: 'idle'
			}
		},
		edit: {
			on: {
				SAVE_CHANGES: {
					target: 'update'
				},
				CANCEL: {
					target: 'idle',
					actions: 'resetStockIncForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-stock-inc',
				src: (ctx, e) => updateStockInc({...ctx.stockInc, ...e.payload}),
				onDone: {
					target:'load',
					actions: 'resetStockIncForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-stock-inc',
				src: (_, e) => deleteStockInc(e.payload.id),
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-stock-inc',
				src: (ctx, e) => createStockInc(e.payload),
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editStockInc: assign({
			stockInc: (ctx, e) => ({...e.payload})
		}),
		resetStockIncForm: assign({
			stockInc: (ctx, _) => ({})
		}),
		successGetStockIncs: assign({
			stockIncs: (ctx, e) => {
				return e.data?.stockIncs.data
			},
			etag: (ctx, e) => e.data.etag
		})
	}
})

const stockIncService = interpret(stockIncMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default stockIncService