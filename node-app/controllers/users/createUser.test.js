import HttpStatusCodes from 'http-status-codes'
import request from 'supertest'

import { app } from '../../services/http/express'
import { verify } from 'jsonwebtoken'

describe('Create User controller', () => {
	it('should create a new user', async () => {
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

		const res = await request(app).put('/users/create').send(mockUser).set('Accept', 'application/json')

		expect(res.headers['content-type']).toMatch(/application\/json/)
		expect(res.statusCode).toEqual(HttpStatusCodes.OK)

		let token = res.body.jwt

		let isValid = true
		try {
			verify(token, process.env.JWT_KEY)
		} catch (error) {
			isValid = false
		}

		expect(res.body).toHaveProperty('jwt')
		expect(isValid).toBe(true)

		const res2 = await request(app).delete('/users/delete').set('Accept', 'application/json').set('Authorization', `Bearer ${token}`)

		expect(res2.statusCode).toEqual(HttpStatusCodes.OK)
	})
})
