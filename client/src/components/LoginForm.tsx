import React, { FC, useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'


export const LoginForm: FC = observer(() => {

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)

	return (
		<div>
			<input
				type='text'
				value={email}
				placeholder='Email'
				onChange={e => setEmail(e.target.value)}
				disabled={store.isLoading}
			/>
			<input
				type='password'
				value={password}
				placeholder='Password'
				onChange={e => setPassword(e.target.value)}
				disabled={store.isLoading}
			/>
			<button
				onClick={() => store.login(email, password)}
				disabled={store.isLoading}
			>
				Login
			</button>
			<button
				onClick={() => store.registration(email, password)}
				disabled={store.isLoading}
			>
				Registration
			</button>
		</div>
	)
})
