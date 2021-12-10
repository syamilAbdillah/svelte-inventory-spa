import { interpret } from 'xstate'
import baseMachineFactory from './base-crud-machine'

const categoryMachine = baseMachineFactory('category', 'categories')
const categoryService = interpret(categoryMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default categoryService