import Joi from 'joi'


export const userValidationSchema = Joi.object({
    email: Joi.string().email().message({
        "string.base": "Email must be a string.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required."
    }).required(),
    password: Joi.string().min(3).messages({
        "string.base": "Password must be a string.",
        "any.required": "Password is required.",
        "string.min": "Password should be minimum 8 character"
    }).required(),
    name: Joi.string().min(2).message({
        "string.base": "Name must be a string.",
        "any.required": "Name is required.",
        "string.min": "Password should be minimum 3 character"
    }).required()
})






