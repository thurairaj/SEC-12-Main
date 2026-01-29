const {z} = require("zod")

const createUserRequestSchema = z.object({
	body: z.object({
		name: z.string().min(1, "Name is required"),
		email: z.email( "Email is required"),
		age:z.number().int().min(0, "Age is must be more than 0"),
	})
})

const getUserByIdSchema = z.object({
	params: z.object({
		id: z.string().min(1, 'Id is required'),
	})
})

module.exports = {
	createUserRequestSchema,
	getUserByIdSchema
}
