import { useState } from 'react'

export const use_storage = (key, initial_value, storage = localStorage) => {
	const [stored_value, set_stored_value] = useState(() => {
		try {
			const item = storage.getItem(key)
			return item ? JSON.parse(item) : initial_value
		} catch (error) {
			console.error(error)
			return initial_value
		}
	})

	const set_value = (value) => {
		try {
			const value_to_store = value instanceof Function ? value(stored_value) : value
			set_stored_value(value_to_store)
			storage.setItem(key, JSON.stringify(value_to_store))
		} catch (error) {
			console.error(error)
		}
	}

	return [stored_value, set_value]
}

export const use_local_storage = (key, initial_value) => use_storage(key, initial_value, localStorage)

export const use_session_storage = (key, initial_value) => use_storage(key, initial_value, sessionStorage)
