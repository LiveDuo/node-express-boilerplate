import { validator } from '../../utilities/validation/validator';

const EmailSchema = {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: { validator: validator.isEmail, message: 'invalid email', isAsync: false }
}

export { EmailSchema }