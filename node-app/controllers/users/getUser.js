import { UserModel } from '../../models/User/user'
import HttpStatusCodes from 'http-status-codes'

import { getCachedThenQuery } from '../../services/caching/nodeCache'

const getUser = async (req, res) => {

	const userId = req.params.userId
	const promise = UserModel.findById(userId).select({ password: 0 })

	try {
		const result = await getCachedThenQuery('get-user-id-'-userId, promise)
		if (result) {
			return res.status(HttpStatusCodes.OK).send(result)
		} else {
			return res.status(HttpStatusCodes.BAD_REQUEST).send({message: res.__('responses').something_went_wrong})
		}
	} catch (error) {
		console.log(error.message)
		return res.status(HttpStatusCodes.BAD_REQUEST).send({message: res.__('responses').something_went_wrong})
	}
}

export { getUser }