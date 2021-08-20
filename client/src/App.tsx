import React, { FC, useState, useContext, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './services/UserService'


const App: FC = observer(() => {

	const { store } = useContext(Context)
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			store.checkAuth()
		}
	}, [])

	const getUsers = async () => {
		try {
			const response = await UserService.fetchUsers()
			setUsers(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	if (store.isChecking) {
		return <div>Loading...</div>
	}

	if (!store.isAuth) {
		return (
			<div>
				<h1>Нужна авторизация!</h1>
				<LoginForm />
			</div>
		)
	}

	return (
		<div>
			<h1>{`Пользователь ${store.user.email} авторизован!`}</h1>
			<h2>{store.user.isActivated ? 'Аккаунт подтвержден!' : 'Подтвердите аккаунт через почту!'}</h2>
			<button
				onClick={() => store.logout()}
				disabled={store.isLoading}
			>
				Logout
			</button>
			<hr />
			<button onClick={getUsers}>Получить список пользователей</button>
			{users.map(user =>
				<div key={user.id}>{user.email} | {user.isActivated ? 'Активирован' : 'Требует активации'}</div>
			)}
		</div>
	)
})

export default App
