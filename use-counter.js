import { useState } from 'react'

export const use_counter = (initial_value = 0) => {
	const [count, set_count] = useState(initial_value)
	
	const increment = (step = 1) => set_count((prev) => prev + step)
	const decrement = (step = 1) => set_count((prev) => prev - step)
	const reset = () => set_count(initial_value)
	
	return { count, increment, decrement, reset }
}
