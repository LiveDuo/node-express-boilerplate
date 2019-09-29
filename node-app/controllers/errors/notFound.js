import { HttpStatusCodes } from '../../utilities/http/httpStatusCodes'

const notFound = (req, res) => {
	return res.status(HttpStatusCodes.NOT_FOUND).send('Unlucky')
}
export { notFound }