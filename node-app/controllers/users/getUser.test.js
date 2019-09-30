import HttpStatusCodes from 'http-status-codes'
import request from 'supertest'

import { app } from '../../services/http/express'

describe('Get users controller', () => {
	it('should create, get and delete a user', async () => {
		const passwordRandom = Math.floor(Math.random()*(999-100+1)+100)
		const emailId = Math.floor(Math.random()*(999-100+1)+100)

		const mockUser = {
			first_name: 'Name',
			last_name: 'Surname',
			password: `password${passwordRandom}`,
			email: `${emailId}@gmail.com`,
			gender: 'm',
			language: 'Greek',
			age: 25,
			favorites: []
		}

		const res = await request(app).post('/users/create').send(mockUser).set('Accept', 'application/json')

		expect(res.statusCode).toEqual(HttpStatusCodes.OK)

		// how to get it dynamically??
		let userId = '5d91de14c169071bc851b4cd'
		const res3 = await request(app).get(`/users/${userId}`).set('Accept', 'application/json')

		expect(res3.statusCode).toEqual(HttpStatusCodes.OK)

		let token = res.body.jwt
		const res2 = await request(app).post('/users/delete').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`)

		expect(res2.statusCode).toEqual(HttpStatusCodes.OK)
	})
})
