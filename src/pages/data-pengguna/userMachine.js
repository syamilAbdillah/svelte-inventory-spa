import { createMachine, assign, interpret } from 'xstate'
import request from '../../utils/request'

async function getUsers() {
	try {
		const resp = await request.get('/user')
		const users = resp.data
		const etag = resp.headers.etag

		return {users, etag}	
	} catch(error) {
		console.log(error)
		return {error}
	}
}

async function createUser(user){
	try {
		const resp = await request.post('/user', user)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function deleteUser(id){
	try {
		const resp = await request.delete(`/user/${id}`)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
}

async function updateUser(user){
	try {
		const resp = await request.put(`/user/${user.id}`,user)
		return resp.data
	} catch(error) {
		console.log(error)
		return error
	}
} 

export const userMachine = createMachine({
	id: 'user-machine',
	initial: 'idle',
	context: {
		etag: undefined,
		users: [],
		user: {}
	},
	states: {
		idle: {
			on: {
				FETCHING: 'load',
				DELETE: 'delete',
				EDIT: {
					target: 'edit',
					actions: 'editUser'
				},
				CREATE: {
					target: 'create'
				}
			}
		},
		load: {
			entry: 'resetUserForm',
			invoke: {
				id: 'get-users',
				src: (ctx, e) => getUsers,
				onDone: {
					target: 'idle',
					actions: 'successGetUsers'
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
					actions: 'resetUserForm'
				}
			}
		},
		update: {
			invoke: {
				id: 'update-user',
				src: (ctx, e) => updateUser({...ctx.user, ...e.payload}),
				onDone: {
					target:'load',
					actions: 'resetUserForm'
				},
				onError: 'edit'
			}
		},
		delete: {
			invoke: {
				id: 'delete-user',
				src: (_, e) => deleteUser(e.payload.id),
				onDone: 'load',
				onError: 'idle'
			}
		},
		create: {
			invoke: {
				id: 'create-new-user',
				src: (ctx, e) => createUser(e.payload),
				onDone: 'load',
				onError: 'create'
			}
		}
	}
}, 
{
	actions: {
		editUser: assign({
			user: (ctx, e) => ({...e.payload})
		}),
		resetUserForm: assign({
			user: (ctx, _) => ({})
		}),
		successGetUsers: assign({
			users: (ctx, e) => {
				return e.data.users.data
			},
			etag: (ctx, e) => e.data.etag
		})
	}
})

const userService = interpret(userMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default userService