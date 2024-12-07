import { useRef, useEffect } from 'react'

export const use_previous = (value) => {
	const ref = useRef()
	
	useEffect(() => {
		ref.current = value
	})
	
	return ref.current
}
