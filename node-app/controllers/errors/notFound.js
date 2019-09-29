import { HttpStatusCodes } from '../../utilities/http/httpStatusCodes'

const notFound = (req, res, next) => {
    // let route = req.url
    return res.status(HttpStatusCodes.NOT_FOUND).send('Unlucky')
}
export { notFound }