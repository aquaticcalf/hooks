import { useState, useCallback } from 'react'

export const use_toggle = (initial_value = false) => {
	const [value, set_value] = useState(initial_value)
	
	const toggle = useCallback(() => {
		set_value((prev) => !prev)
	}, [])
	
	return [value, toggle]
}
