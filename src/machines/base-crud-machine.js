import { createMachine, assign } from 'xstate'
import request from '../utils/request'


function baseMachineFactory(entity, entities, opt = {}) {
	
	async function getEntities() {
		try {
			const resp = await request.get(`/${opt.url ? opt.url: entity}`)
			
			const result = {}

			result[entities] = resp.data
			result['etag'] = resp.headers.etag


			return result	
		} catch(error) {
			console.log(error)
			return {error}
		}
	}

	async function createEntity(entityObj){
		try {
			const resp = await request.post(`/${opt.url ? opt.url: entity}`, entityObj)
			return resp.data
		} catch(error) {
			console.log(error)
			return error
		}
	}

	async function deleteEntity(id){
		try {
			const resp = await request.delete(`/${opt.url ? opt.url: entity}/${id}`)
			return resp.data
		} catch(error) {
			console.log(error)
			return error
		}
	}

	async function updateEntity(entityObj){
		try {
			const resp = await request.put(`/${opt.url ? opt.url: entity}/${entityObj.id}`,entityObj)
			return resp.data
		} catch(error) {
			console.log(error)
			return error
		}
	}

	const context = {}
	context[entities] = []
	context[entity] = {} 
	context['etag'] = undefined

	const editEntityObject = {}
	editEntityObject[entity] = (ctx, e) => ({...e.payload})

	const resetEntityObject = {}
	resetEntityObject[entity] = (ctx, e) => ({})

	const successGetEntitiesObject = {}
	successGetEntitiesObject[entities] = (ctx, e) => e.data[entities].data
	successGetEntitiesObject['etag'] = (ctx, e) => e.data.etag

	const config = {
		id: `${entity}-machine`,
		initial: 'idle',
		context: {...context},
		states: {
			idle: {
				on: {
					FETCHING: 'load',
					DELETE: 'delete',
					EDIT: {
						target: 'edit',
						actions: 'editEntity'
					},
					CREATE: {
						target: 'create'
					}
				}
			},
			load: {
				entry: 'resetEntity',
				invoke: {
					id: `get-${entities}`,
					src: (ctx, e) => getEntities,
					onDone: {
						target: 'idle',
						actions: 'successGetEntities'
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
						actions: 'resetEntity'
					}
				}
			},
			update: {
				invoke: {
					id: `update-${entity}`,
					src: (ctx, e) => updateEntity({...ctx[entity], ...e.payload}),
					onDone: {
						target:'load',
						actions: 'resetEntity'
					},
					onError: 'edit'
				}
			},
			delete: {
				invoke: {
					id: `delete-${entity}`,
					src: (_, e) => deleteEntity(e.payload.id),
					onDone: 'load',
					onError: 'idle'
				}
			},
			create: {
				invoke: {
					id: `create-new-${entity}`,
					src: (ctx, e) => createEntity(e.payload),
					onDone: 'load',
					onError: 'create'
				}
			}
		}
	} 

	const actions = {
		actions: {
			editEntity: assign({...editEntityObject}),
			resetEntity: assign({...resetEntityObject}),
			successGetEntities: assign({...successGetEntitiesObject})
		}
	}

	if(opt.withOption == true) {
		config.states.loadOptions = {
			after: {
				1000: 'idle'
			}
		}

		config.states.load = {
			...config.states.load, 
			invoke: {
				...config.states.load.invoke, 
				onDone: {
					...config.states.load.invoke.onDone,
					target: 'loadOptions'
				}
			}
		}
	}

	console.log(config)

	return createMachine(config, actions)
}

export default baseMachineFactory