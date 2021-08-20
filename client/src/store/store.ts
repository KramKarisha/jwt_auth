import axios from 'axios'
import { IUser } from '../models/IUser'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../api'


export default class Store {

	user = {} as IUser
	isAuth = false
	isLoading = false
	isChecking = false

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: IUser) {
		this.user = user
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setLoading(bool: boolean) {
		this.isLoading = bool
	}

	setChecking(bool: boolean) {
		this.isChecking = bool
	}

	async login(email: string, password: string) {
		this.setLoading(true)
		try {
			const response = await AuthService.login(email, password)
			console.log(response)
			localStorage.setItem('accessToken', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e) {
			console.log(e.response)
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async registration(email: string, password: string) {
		this.setLoading(true)
		try {
			const response = await AuthService.registration(email, password)
			console.log(response)
			localStorage.setItem('accessToken', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e) {
			console.log(e.response)
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		this.setLoading(true)
		try {
			const response = await AuthService.logout()
			console.log(response)
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (e) {
			console.log(e.response)
		} finally {
			this.setLoading(false)
		}
	}

	async checkAuth() {
		this.setChecking(true)
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
			console.log(response)
			localStorage.setItem('accessToken', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e) {
			console.log(e.response)
			console.log(e.response?.data?.message)
		} finally {
			this.setChecking(false)
		}
	}
}
