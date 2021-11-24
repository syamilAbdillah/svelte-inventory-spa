import { createMachine, assign, interpret } from 'xstate';
import {writable, get} from 'svelte/store' 

export const unit = writable({})

const mockFetching = () => 
	new Promise((resolve, reject) => 
		setTimeout(() => resolve({ data: 'yay' }), 1000)
	)


async function getUnits() {
	try {
		const resp = await fetch('http://localhost:5000/unit/')
		if(resp.status != 200) throw new Error(resp.status)

		const units = await resp.json()
		const etag = resp.headers.get('etag')

		return {units, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createUnit(unit){
	try {
		const resp = await fetch('http://localhost:5000/unit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(unit)
		})

		if (resp.status !== 201) throw new Error(resp.status)

		const json = await resp.json()

		return json	
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteUnit(id){
	try {
		const resp = await fetch(`http://localhost:5000/unit/${id}`, {
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

async function updateUnit(unit){
	try {
		const resp = await fetch(`http://localhost:5000/unit/${unit.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(unit)
		})

		if(resp.status != 200) throw new Error(resp.status)

		return await resp.json()
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
				return e.data.units.data
			},
			etag: (ctx, e) => e.data.etag
		})
	},
	guards: {}
})

const unitService = interpret(unitMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default unitService