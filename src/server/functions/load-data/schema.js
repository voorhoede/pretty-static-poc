const inputSchema = {
    properties: {
        httpMethod: { enum: ['GET'] },
    }
}

const outputSchema = {
    type: 'object',
    required: ['body'],
}

module.exports = {
    inputSchema,
    outputSchema,
}