import { createMachine, assign, interpret } from 'xstate'
import request from '../../utils/request'

async function getStockDecs() {
	try {
		const resp = await request.get('/stock-dec')
		const stockDecs = resp.data
		const etag = resp.headers.etag

		return {stockDecs, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createStockDec(stockDec){
	try {
		const resp = await request.post('/stock-dec', stockDec)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteStockDec(id){
	try {
		const resp = await request.delete(`/stock-dec/${id}`)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateStockDec(stockDec){
	try {
		const resp = await request.put(`/stock-dec/${stockDec.id}`,stockDec)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
} 

export const stockDecMachine = createMachine({
	id: 'stock-dec-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		stockDecs: [],
		stockDec: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editStockDec'
				},
				CREATE: {
					target: 'create'
				}
			}
		},
		load: {
			entry: 'resetStockDecForm',
			invoke: {
				id: 'get-stock-decs',
				src: (ctx, e) => getStockDecs,
				onDone: {
					target: 'idle',
					actions: 'successGetStockDecs'
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
					actions: 'resetStockDecForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-stock-dec',
				src: (ctx, e) => updateStockDec({...ctx.stockDec, ...e.payload}),
				onDone: {
					target:'load',
					actions: 'resetStockDecForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-stock-dec',
				src: (_, e) => deleteStockDec(e.payload.id),
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-stock-dec',
				src: (ctx, e) => createStockDec(e.payload),
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editStockDec: assign({
			stockDec: (ctx, e) => ({...e.payload})
		}),
		resetStockDecForm: assign({
			stockDec: (ctx, _) => ({})
		}),
		successGetStockDecs: assign({
			stockDecs: (ctx, e) => {
				return e.data?.stockDecs.data
			},
			etag: (ctx, e) => e.data.etag
		})
	}
})

const stockDecService = interpret(stockDecMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default stockDecService