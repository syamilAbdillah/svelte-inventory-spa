import { interpret } from 'xstate'
import baseMachineFactory from './base-crud-machine'

const userMachine = baseMachineFactory('user', 'users')
const userService = interpret(userMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default userService