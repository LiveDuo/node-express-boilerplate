import { UserModel } from '../../models/User/user'
import HttpStatusCodes from 'http-status-codes'

import { uploadToFolderpath, removeFromTemp, storeBufferToTemp } from '../../services/helpers/upload'

import { pubsub } from '../../services/pubsub/google'

const doUpdateUserAsync = async (userId, fileDecoded) => {
	let filepath = await storeBufferToTemp(fileDecoded.buffer, fileDecoded.originalname)
	let mediaUrls = await uploadToFolderpath(filepath, 'update-multiple', true)
	await removeFromTemp(fileDecoded.originalname)
	
	let result = await UserModel.findByIdAndUpdate(userId, {mediaUrls: mediaUrls}, {new: true}).select({ password: 0 })
	pubsub.publish('USER_UPDATED', { onUpdateUser: {...result._doc}})
	console.log(`updated ${result._id} async`)
}

const updateUser = async (req, res) => {

	let body = JSON.parse(req.body.json)
	if (req.file) {
		try {
			let fileDecoded = await req.file
			if (body.is_sync) {
				let filepath = await storeBufferToTemp(fileDecoded.buffer, fileDecoded.originalname)
				let mediaUrls = await uploadToFolderpath(filepath, 'update-multiple', true)
				await removeFromTemp(fileDecoded.originalname)
				
				req.image_urls = mediaUrls
			} else {
				doUpdateUserAsync(req.userId, fileDecoded)
			}
		} catch (error) {
			console.log(error.message)
			return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: res.__('responses').image_upload_failed})
		}
	}

	try {
		let result = await UserModel.findByIdAndUpdate(req.userId, body, {new: true}).select({ password: 0 })
		pubsub.publish('USER_UPDATED', { onUpdateUser: {...result._doc}})
		return res.status(HttpStatusCodes.OK).send({...result._doc})
	} catch (error) {
		console.log(error.message)
		return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: res.__('responses').user_not_found})
	}
}

export { updateUser }