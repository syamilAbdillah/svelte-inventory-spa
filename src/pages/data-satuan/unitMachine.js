import { createMachine, assign, interpret } from 'xstate'
import request from '../../utils/request'

async function getUnits() {
	try {
		const resp = await request('/unit')
		const etag = resp?.headers['etag']
		const units = resp?.data.data
		return {units, etag}	
	} catch(error) {
		return {error}
	}
}

async function createUnit(unit){
	try {
		const resp = await request.post('/unit', unit)

		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteUnit(id){
	try {
		const resp = await request.delete(`/unit/${id}`)

		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateUnit(unit){
	try {
		const resp = await request.put(`/unit/${unit.id}`, unit)

		return await resp.data
	} catch(error) {
		console.log(error)
		return error
	}
} 

export const unitMachine = createMachine({
	id: 'unit-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		units: [],
		unit: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editUnit'
				},
				CREATE: {
					target: 'create'
				}
			}
		},
		load: {
			entry: 'resetUnitForm',
			invoke: {
				id: 'get-units',
				src: (ctx, e) => getUnits,
				onDone: {
					target: 'idle',
					actions: 'successGetUnits'
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
					actions: 'resetUnitForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-unit',
				src: (ctx, e) => updateUnit({...ctx.unit, ...e.payload}),
				onDone: {
					target:'load',
					actions: 'resetUnitForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-unit',
				src: (_, e) => deleteUnit(e.payload.id),
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-unit',
				src: (ctx, e) => createUnit(e.payload),
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editUnit: assign({
			unit: (ctx, e) => ({...e.payload})
		}),
		resetUnitForm: assign({
			unit: (ctx, _) => ({})
		}),
		successGetUnits: assign({
			units: (ctx, e) => {
				if(e.data.error) return []
				return e.data.units
			},
			etag: (ctx, e) => e.data.etag
		})
	}
})

const unitService = interpret(unitMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default unitService