import mongoose from 'mongoose'
const Schema = mongoose.Schema

import { EmailSchema } from '../Email/email'

const UserSchema = new Schema({
    first_name: { type: String, required: true, max: 50 },
    last_name: { type: String, required: true, max: 50 },
    password: { type: String, required: true },
    email: EmailSchema,
    gender: { type: String, max: 50 },
    language: { type: String, max: 50 },
    age: {type: Number, min: 0, max: 150},
    city: { type: String, max: 50 },
    state: { type: String, max: 50 },
    type: { type: String, max: 50 },
    favorites: [{ type: String }]
})

export const UserModel = mongoose.model('User', UserSchema)