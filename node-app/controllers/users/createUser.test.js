import { HttpStatusCodes } from '../../utilities/http/httpStatusCodes'
import request from 'supertest'

import { app } from '../../utilities/http/express'
import { verify } from '../../utilities/authentication/jsonwebtoken'

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

		const res = await request(app).post('/users/create').send(mockUser).set('Accept', 'application/json')

		expect(res.headers['content-type']).toMatch(/application\/json/)
		expect(res.statusCode).toEqual(HttpStatusCodes.OK)

		let isValid = true
		try {
			verify(res.body.jwt, process.env.JWT_KEY)
		} catch (error) {
			isValid = false
		}

		expect(res.body).toHaveProperty('jwt')
		expect(isValid).toBe(true)
	})
})
