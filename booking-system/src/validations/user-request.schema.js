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


const listUserSchema = z.object({
	query : z.object({
		page: z.string()
			.optional()
			.transform(value => value ? Number(value) : 1 )
			.refine(transformedValue => Number.isInteger(transformedValue) && transformedValue > 0, "page must be >= 1"),
		limit: z.string()
			.optional()
			.transform(value => value ? Number(value) : 1 )
			.refine(transformedValue => Number.isInteger(transformedValue) && transformedValue > 0, "page must be >= 1"),
		q: z.string().optional()
	})
})

module.exports = {
	createUserRequestSchema,
	getUserByIdSchema,
	listUserSchema
}
