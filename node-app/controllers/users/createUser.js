import { UserModel } from '../../models/User/user'
import { HttpStatusCodes } from '../../utilities/http/httpStatusCodes'
import { sign } from '../../utilities/authentication/jsonwebtoken'
import { hash } from '../../utilities/authentication/bcrypt'

const createUser = async (req, res) => {
    
    // const passwordHashed = await hash('password', 10)

    // const emailId = Math.floor(Math.random()*(999-100+1)+100)

    // const mockUser = {
    //     first_name: 'Name',
    //     last_name: 'Surname',
    //     passwordHashed: passwordHashed,
    //     email: `${emailId}@gmail.com`,
    //     gender: 'm',
    //     language: 'Greek',
    //     age: 25,
    //     favorites: []
    // }

    const passwordHashed = await hash(req.body.password, 10)

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: passwordHashed,
        email: req.body.email,
        gender: req.body.gender,
        language: req.body.language,
        age: req.body.age,
        favorites: req.body.favorites
    }
    const User = new UserModel(user)
    try {
        const result = await User.save()
        const token = sign({ id: result._id }, process.env.JWT_KEY)
        // console.log(result)
        return res.status(HttpStatusCodes.OK).send({ jwt: token })
    } catch (error) {
        console.log(error.message)
        return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: res.__('responses').invalid_request})
    }
    
}
export { createUser }