import { createMachine, assign } from 'xstate'
import request from '../utils/request'


function baseMachineFactory(entity, entities) {
	
	async function getEntities() {
		try {
			const resp = await request.get(`/${entity}`)
			
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
			const resp = await request.post(`/${entity}`, entityObj)
			return resp.data
		} catch(error) {
			console.log(error)
			return error
		}
	}

	async function deleteEntity(id){
		try {
			const resp = await request.delete(`/${entity}/${id}`)
			return resp.data
		} catch(error) {
			console.log(error)
			return error
		}
	}

	async function updateEntity(entityObj){
		try {
			const resp = await request.put(`/${entity}/${entityObj.id}`,entityObj)
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


	return createMachine({
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
	}, 
	{
		actions: {
			editEntity: assign({...editEntityObject}),
			resetEntity: assign({...resetEntityObject}),
			successGetEntities: assign({...successGetEntitiesObject})
		}
	})
}

export default baseMachineFactory