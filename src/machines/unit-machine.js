
import { interpret } from 'xstate'
import baseMachineFactory from './base-crud-machine'

const unitMachine = baseMachineFactory('unit', 'units')
const unitService = interpret(unitMachine)
	.onTransition(state => {
		console.log('<###>', state.value, '</###>')
	})
	.start()

export default unitService